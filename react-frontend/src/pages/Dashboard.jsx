import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Upload from "./Upload";
import PerformanceReport from "./PerformanceReport";
import { api } from "../services/api";
import "../styles/main.css";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [outputContent, setOutputContent] = useState("");
  const [isABCKeyboard, setIsABCKeyboard] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [brainSignalActive, setBrainSignalActive] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const signalTimeoutRef = useRef(null);

  // Keyboard selector state — default to center of keyboard (row 1 = middle row, col 4 = "P")
  const [selectorRow, setSelectorRow] = useState(1);
  const [selectorCol, setSelectorCol] = useState(4);
  const [activeArea, setActiveArea] = useState("keyboard"); // 'keyboard' or 'suggestions'
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const wsRef = useRef(null);

  // Refs that mirror state — used inside WebSocket callbacks to avoid stale closures
  const selectorRowRef = useRef(1);
  const selectorColRef = useRef(4);
  const activeAreaRef = useRef("keyboard");
  const suggestionIndexRef = useRef(0);

  // Keep refs in sync with state
  useEffect(() => {
    selectorRowRef.current = selectorRow;
  }, [selectorRow]);
  useEffect(() => {
    selectorColRef.current = selectorCol;
  }, [selectorCol]);
  useEffect(() => {
    activeAreaRef.current = activeArea;
  }, [activeArea]);
  useEffect(() => {
    suggestionIndexRef.current = suggestionIndex;
  }, [suggestionIndex]);

  // Streaming state
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamInfo, setStreamInfo] = useState({
    trialNumber: 0,
    totalTrials: 0,
    className: "",
    confidence: 0,
    action: "",
  });

  // Session and backend state
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [user, setUser] = useState(null);

  const initialText = "Say what's on your mind — we'll turn it into words.";

  // Simple dictionary for intellisense
  const commonWords = [
    "the",
    "be",
    "to",
    "of",
    "and",
    "a",
    "in",
    "that",
    "have",
    "I",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
    "from",
    "they",
    "we",
    "say",
    "her",
    "she",
    "or",
    "an",
    "will",
    "my",
    "one",
    "all",
    "would",
    "there",
    "their",
    "what",
    "so",
    "up",
    "out",
    "if",
    "about",
    "who",
    "get",
    "which",
    "go",
    "me",
    "hello",
    "help",
    "yes",
    "no",
    "thanks",
    "please",
    "good",
    "bad",
    "pain",
    "water",
  ];

  const activateSignal = () => {
    if (signalTimeoutRef.current) {
      clearTimeout(signalTimeoutRef.current);
    }
    setBrainSignalActive(true);
    signalTimeoutRef.current = setTimeout(() => {
      setBrainSignalActive(false);
    }, 5000);
  };

  const updateSuggestions = (text) => {
    if (!text || text === initialText) {
      setSuggestions(["hello", "help", "yes", "no", "thanks"]);
      return;
    }
    const lastWord = text.split(" ").pop().toLowerCase();
    if (!lastWord) {
      setSuggestions(["the", "I", "it", "this", "what"]);
      return;
    }
    const matches = commonWords
      .filter((word) => word.startsWith(lastWord) && word !== lastWord)
      .slice(0, 5);
    setSuggestions(
      matches.length > 0 ? matches : ["the", "and", "is", "it", "to"],
    );
  };

  const handleKeyClick = (key) => {
    activateSignal();

    setOutputContent((prev) => {
      let newContent = prev === initialText ? "" : prev;

      if (key === "DEL") {
        newContent = newContent.slice(0, -1);
      } else if (key === "CLEAR") {
        newContent = "";
      } else if (key === "SPACE") {
        newContent = newContent + " ";
      } else if (key === "QUICK_SPEAK") {
        // Handled below via useEffect to avoid breaking state updater
        return newContent;
      } else {
        newContent = newContent + key;
      }

      updateSuggestions(newContent);

      // Update session stats
      if (currentSessionId) {
        const words = newContent.split(" ").filter((w) => w.length > 0);
        api
          .updateSession(currentSessionId, {
            words_typed: words.length,
            characters: newContent.length,
          })
          .catch(console.error);
      }

      return newContent;
    });

    if (key === "QUICK_SPEAK") {
      setShowModal(true);
    }
  };

  const handlePhraseClick = (phrase) => {
    if (phrase !== "Close.") {
      activateSignal();
      setOutputContent((prev) => {
        const current = prev === initialText ? "" : prev;
        const newContent =
          current.length > 0 && current[current.length - 1] !== " "
            ? current + " "
            : current;
        return newContent + phrase;
      });
    }
    setShowModal(false);
  };

  const handleSuggestionClick = (word) => {
    activateSignal();
    setOutputContent((prev) => {
      const current = prev === initialText ? "" : prev;
      const words = current.split(" ");
      words.pop(); // Remove partial word
      const newContent =
        words.join(" ") + (words.length > 0 ? " " : "") + word + " ";
      return newContent;
    });
    updateSuggestions(""); // Reset suggestions or predict next word
  };

  const quickSpeakPhrases = [
    "Yes",
    "No",
    "I need help.",
    "I am okay today.",
    "How are you?",
    "Thank you.",
    "Please adjust my position.",
    "I feel pain.",
    "Close.",
  ];

  const abcKeys = [
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
    ["L", "M", "N", "O", "P", "Q", "R", "S", "T"],
    ["U", "V", "W", "X", "Y", "Z"],
  ];

  const numKeys = [
    ["1", "2", "3", "4"],
    ["5", "6", "7", "8"],
    ["9", "0", ".", ","],
  ];

  // Get current keyboard layout
  const getCurrentKeys = () => (isABCKeyboard ? abcKeys : numKeys);

  // Get current selected key
  const getSelectedKey = () => {
    const keys = getCurrentKeys();
    if (
      selectorRow >= 0 &&
      selectorRow < keys.length &&
      selectorCol >= 0 &&
      selectorCol < keys[selectorRow].length
    ) {
      return keys[selectorRow][selectorCol];
    }
    return null;
  };

  // Navigate selector based on prediction
  // Uses refs to always read the latest state values (avoids stale closure in WS callbacks)
  const navigateSelector = (action) => {
    const keys = getCurrentKeys();
    const currentArea = activeAreaRef.current;

    if (currentArea === "keyboard") {
      let newRow = selectorRowRef.current;
      let newCol = selectorColRef.current;

      switch (action) {
        case "move_left":
          if (newCol > 0) {
            newCol--;
          } else {
            // Wrap to rightmost key of current row
            newCol = keys[newRow].length - 1;
          }
          break;
        case "move_right":
          if (newRow < keys.length && newCol < keys[newRow].length - 1) {
            newCol++;
          } else {
            // Wrap to leftmost key of current row
            newCol = 0;
          }
          break;
        case "move_down":
          if (newRow < keys.length - 1) {
            newRow++;
            // Adjust column if new row is shorter
            if (newCol >= keys[newRow].length) {
              newCol = keys[newRow].length - 1;
            }
          } else {
            // Wrap from bottom row back to top row
            newRow = 0;
            if (newCol >= keys[newRow].length) {
              newCol = keys[newRow].length - 1;
            }
          }
          break;
        case "select_letter":
          if (
            newRow >= 0 &&
            newRow < keys.length &&
            newCol >= 0 &&
            newCol < keys[newRow].length
          ) {
            const keyToSelect = keys[newRow][newCol];
            handleKeyClick(keyToSelect);
          }
          break;
        default:
          break;
      }
      setSelectorRow(newRow);
      setSelectorCol(newCol);
      selectorRowRef.current = newRow;
      selectorColRef.current = newCol;
    } else if (currentArea === "suggestions") {
      let newIdx = suggestionIndexRef.current;

      switch (action) {
        case "move_left":
          if (newIdx > 0) {
            newIdx--;
          } else {
            // Wrap to last suggestion
            newIdx = suggestions.length - 1;
          }
          break;
        case "move_right":
          if (newIdx < suggestions.length - 1) {
            newIdx++;
          } else {
            // Wrap to first suggestion
            newIdx = 0;
          }
          break;
        case "move_down":
          // Moving down from suggestions goes back to keyboard top row
          setActiveArea("keyboard");
          activeAreaRef.current = "keyboard";
          setSelectorRow(1);
          selectorRowRef.current = 1;
          setSelectorCol(4);
          selectorColRef.current = 4;
          return;
        case "select_letter":
          if (suggestions[newIdx]) handleSuggestionClick(suggestions[newIdx]);
          break;
        default:
          break;
      }
      setSuggestionIndex(newIdx);
      suggestionIndexRef.current = newIdx;
    }
  };

  // Generate simulated EEG data for testing (22 channels, 1001 time points)
  const generateSimulatedEEG = () => {
    const channels = 22;
    const timePoints = 1001;
    const eegData = [];

    for (let i = 0; i < channels; i++) {
      const channel = [];
      for (let j = 0; j < timePoints; j++) {
        // Generate realistic EEG-like signal (sine waves with noise)
        const signal = Math.sin(j * 0.1) * 0.5 + Math.random() * 0.3 - 0.15;
        channel.push(signal);
      }
      eegData.push(channel);
    }

    return eegData;
  };

  // Handle prediction from backend
  const handlePrediction = async (eegData) => {
    if (!currentSessionId) {
      console.warn("No active session. Starting session...");
      await startSession();
      if (!currentSessionId) {
        alert("Failed to start session. Please try again.");
        return;
      }
    }

    try {
      const prediction = await api.predictSignal(eegData, currentSessionId);
      navigateSelector(prediction.action);

      // Visual feedback
      activateSignal();
    } catch (error) {
      console.error("Prediction error:", error);
      alert(`Prediction failed: ${error.message}`);
    }
  };

  // Stop the prediction stream
  const stopStream = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsStreaming(false);
  };

  // Start real-time prediction stream from an uploaded dataset
  const startBrainStream = async () => {
    // Don't start if already streaming
    if (isStreaming) {
      stopStream();
      return;
    }

    let sessionId = currentSessionId;

    if (!sessionId) {
      console.warn("No active session. Starting session...");
      try {
        const session = await api.createSession();
        setCurrentSessionId(session.session_id);
        setIsRecording(true);
        sessionId = session.session_id;
      } catch (e) {
        console.error("Failed to start session:", e);
        alert("Failed to start session. Please try again.");
        return;
      }
    }

    // Check if we have an active uploaded dataset
    const datasetJson = localStorage.getItem("activeDataset");
    if (!datasetJson) {
      alert(
        "No dataset selected. Please upload a .mat file first from the Upload Dataset panel.",
      );
      return;
    }

    try {
      const dataset = JSON.parse(datasetJson);
      // Disconnect existing WebSocket if any
      if (wsRef.current) wsRef.current.close();

      // Reset selector position to center of keyboard ("P")
      setSelectorRow(1);
      setSelectorCol(4);
      setActiveArea("keyboard");

      wsRef.current = api.connectPredictionStream(
        sessionId,
        dataset.patientId,
        dataset.filename,
        {
          onStreamStart: (data) => {
            setIsStreaming(true);
            setStreamInfo((prev) => ({
              ...prev,
              totalTrials: data.total_trials,
              trialNumber: 0,
            }));
          },
          onPrediction: (data) => {
            // Update the stream info panel
            setStreamInfo({
              trialNumber: data.trial_number,
              totalTrials: data.total_trials,
              className: data.class_name,
              confidence: data.confidence,
              action: data.action,
            });
            // Navigate the keyboard cursor
            navigateSelector(data.action);
            activateSignal();
          },
          onComplete: (data) => {
            setIsStreaming(false);
            setStreamInfo((prev) => ({
              ...prev,
              trialNumber: prev.totalTrials,
            }));
            alert(
              `✅ Prediction complete! Processed ${data.total_trials} trials.`,
            );
          },
          onError: (err) => {
            console.error("Stream error:", err);
            setIsStreaming(false);
            alert(`Stream error: ${err.message}`);
          },
          onClose: () => {
            console.log("Stream closed");
            // Only reset streaming state if it wasn't already reset by onComplete
            setIsStreaming(false);
          },
        },
      );
    } catch (e) {
      console.error("Error starting prediction stream:", e);
      alert(`Failed to start predictions: ${e.message}`);
    }
  };

  const testPrediction = async () => {
    const eegData = generateSimulatedEEG();
    await handlePrediction(eegData);
  };

  // Start new session
  const startSession = async () => {
    try {
      const session = await api.createSession();
      setCurrentSessionId(session.session_id);
      setIsRecording(true);
      setSelectorRow(1);
      setSelectorCol(4);
    } catch (error) {
      console.error("Failed to start session:", error);
    }
  };

  // End current session
  const endSession = async () => {
    if (!currentSessionId) return;

    try {
      // Update session stats
      const words = outputContent.split(" ").filter((w) => w.length > 0);
      await api.updateSession(currentSessionId, {
        words_typed: words.length,
        characters: outputContent.length,
        quick_phrases: 0, // Track this separately
        suggestions_used: 0, // Track this separately
      });

      await api.endSession(currentSessionId);
      setCurrentSessionId(null);
      setIsRecording(false);
    } catch (error) {
      console.error("Failed to end session:", error);
    }
  };

  // Initialize session and user on mount
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Get current user
        const userData = await api.getCurrentUser();
        setUser(userData);

        // Start a new session
        await startSession();
      } catch (error) {
        console.error("Initialization error:", error);
        // Only redirect if it's an authentication error
        if (
          error.message === "Not authenticated" ||
          error.message.includes("401") ||
          error.message.includes("Invalid authentication") ||
          error.message.includes("Unauthorized")
        ) {
          console.log("Authentication failed, redirecting to home");
          navigate("/");
        } else {
          // For other errors, just log them but don't redirect
          console.error("Non-auth error during initialization:", error);
        }
      }
    };

    document.body.style.overflow = "hidden";
    updateSuggestions("");
    initializeDashboard();

    return () => {
      document.body.style.overflow = "auto";
      if (signalTimeoutRef.current) {
        clearTimeout(signalTimeoutRef.current);
      }
    };
  }, []);

  // Cleanup session on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (currentSessionId) {
        endSession().catch(console.error);
      }
    };
  }, [currentSessionId]);

  // Update session stats when content changes
  useEffect(() => {
    if (currentSessionId && outputContent && outputContent !== initialText) {
      const words = outputContent.split(" ").filter((w) => w.length > 0);
      const lastWord = words[words.length - 1];

      // Add word to history when space is added
      if (lastWord && outputContent.endsWith(" ")) {
        api.addWordToHistory(currentSessionId, lastWord).catch(console.error);
      }
    }
  }, [outputContent, currentSessionId]);

  return (
    <>
      <div className="chat-app">
        <aside className="sidebar">
          <div className="sidebar-header">
            <span className="chatgpt-logo">MINDKEY</span>
            <i className="fas fa-chevron-down"></i>
          </div>

          <div className="new-chat">
            <button
              onClick={() => {
                setShowUploadModal(false);
                setShowPerformanceModal(false);
              }}
              className={`sidebar-action-btn ${!showUploadModal && !showPerformanceModal ? "active" : ""}`}
            >
              Keyboard Interface
            </button>
          </div>

          <nav className="nav-links">
            <button
              onClick={() => {
                setShowUploadModal(true);
                setShowPerformanceModal(false);
              }}
              className={`sidebar-action-btn ${showUploadModal ? "active" : ""}`}
            >
              Upload Dataset
            </button>
            <button
              onClick={() => {
                setShowPerformanceModal(true);
                setShowUploadModal(false);
              }}
              className={`sidebar-action-btn ${showPerformanceModal ? "active" : ""}`}
            >
              Performance Reports
            </button>
          </nav>

          <div className="chat-history-section"></div>

          <div className="sidebar-footer">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="sidebar-logout-btn"
            >
              Logout
            </button>
            <div
              className="user-info"
              onClick={() => setShowSettingsModal(true)}
            >
              <span className="user-icon">
                {user?.full_name?.charAt(0) || "U"}
              </span>
              <span className="username">{user?.full_name || "User"}</span>
              <i
                className="fas fa-cog ms-auto text-muted"
                style={{ fontSize: "0.8rem" }}
              ></i>
            </div>
          </div>
        </aside>

        <main className="main-content">
          {showPerformanceModal ? (
            <PerformanceReport />
          ) : showUploadModal ? (
            <Upload onUploadComplete={() => setShowUploadModal(false)} />
          ) : (
            <div className="modern-keyboard-wrapper">
              {/* Header */}
              <div className="keyboard-header">
                <h1 className="keyboard-title">
                  ASSISTIVE COMMUNICATION SYSTEM
                </h1>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                    marginTop: "10px",
                    alignItems: "center",
                    flexWrap: "nowrap",
                  }}
                >
                  <button
                    onClick={startBrainStream}
                    className={`btn ${isStreaming ? "btn-danger" : "btn-primary"}`}
                    style={{
                      padding: "7px 18px",
                      fontSize: "0.8rem",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                    title={
                      isStreaming
                        ? "Stop predictions"
                        : "Start predictions from dataset"
                    }
                  >
                    <i
                      className={`fas ${isStreaming ? "fa-stop" : "fa-brain"}`}
                    ></i>
                    {isStreaming ? "Stop" : "Start Predictions"}
                  </button>
                  {currentSessionId && (
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#64748b",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: isStreaming ? "#f59e0b" : "#10b981",
                          display: "inline-block",
                          animation: isStreaming ? "pulse 1s infinite" : "none",
                        }}
                      ></span>
                      {isStreaming ? "Streaming" : "Session Active"}
                    </span>
                  )}

                  {/* Live Streaming Status — inline beside the button */}
                  {isStreaming && streamInfo.totalTrials > 0 && (
                    <div
                      style={{
                        padding: "6px 16px",
                        background: "rgba(59, 130, 246, 0.08)",
                        borderRadius: "20px",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        flexShrink: 1,
                        minWidth: 0,
                      }}
                    >
                      {/* Trial Counter */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.65rem",
                            color: "#64748b",
                            textTransform: "uppercase",
                            letterSpacing: "0.3px",
                          }}
                        >
                          Trial
                        </span>
                        <span
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            color: "#1e293b",
                          }}
                        >
                          {streamInfo.trialNumber}/{streamInfo.totalTrials}
                        </span>
                      </div>

                      {/* Mini Progress Bar */}
                      <div style={{ width: "80px", flexShrink: 0 }}>
                        <div
                          style={{
                            width: "100%",
                            height: "5px",
                            background: "#e2e8f0",
                            borderRadius: "3px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${(streamInfo.trialNumber / streamInfo.totalTrials) * 100}%`,
                              height: "100%",
                              background:
                                "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                              borderRadius: "3px",
                              transition: "width 0.3s ease",
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Current Prediction */}
                      {streamInfo.className && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#1e293b",
                            }}
                          >
                            {streamInfo.className}
                          </span>
                          <span
                            style={{ fontSize: "0.7rem", color: "#64748b" }}
                          >
                            {(streamInfo.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      )}

                      {/* Action indicator */}
                      {streamInfo.action && (
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color:
                              streamInfo.action === "select_letter"
                                ? "#10b981"
                                : "#3b82f6",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {streamInfo.action === "move_left"
                            ? "⬅"
                            : streamInfo.action === "move_right"
                              ? "➡"
                              : streamInfo.action === "move_down"
                                ? "⬇"
                                : streamInfo.action === "select_letter"
                                  ? "✓"
                                  : ""}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="keyboard-layout-grid">
                {/* Left Panel - Input Mode & Quick Speak */}
                <div className="left-panel">
                  {/* Input Mode Selection */}
                  <div className="mode-section">
                    <h3 className="section-label">INPUT MODE</h3>
                    <div className="mode-buttons">
                      <button
                        className={`mode-btn ${isABCKeyboard ? "active" : ""}`}
                        onClick={() => setIsABCKeyboard(true)}
                      >
                        ABC
                      </button>
                      <button
                        className={`mode-btn ${!isABCKeyboard ? "active" : ""}`}
                        onClick={() => setIsABCKeyboard(false)}
                      >
                        123
                      </button>
                    </div>
                  </div>

                  {/* Quick Speak Section */}
                  <div className="quick-speak-section">
                    <h3 className="section-label">
                      <i className="fas fa-comment"></i> QUICK SPEAK
                    </h3>
                    <div className="quick-speak-list">
                      {quickSpeakPhrases
                        .filter((p) => p !== "Close.")
                        .map((phrase, index) => (
                          <button
                            key={index}
                            className="quick-speak-btn"
                            onClick={() => handlePhraseClick(phrase)}
                          >
                            <span>{phrase}</span>
                            <i className="fas fa-volume-up"></i>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Right Panel - Display & Keyboard */}
                <div className="right-panel">
                  {/* Display Section */}
                  <div className="display-section">
                    <div className="display-header">
                      <h3 className="section-label">DISPLAY</h3>
                      <button
                        className="speak-btn"
                        onClick={() => {
                          if (
                            "speechSynthesis" in window &&
                            outputContent &&
                            outputContent !== initialText
                          ) {
                            const utterance = new SpeechSynthesisUtterance(
                              outputContent,
                            );
                            window.speechSynthesis.speak(utterance);
                          }
                        }}
                      >
                        <i className="fas fa-volume-up"></i> Speak
                      </button>
                    </div>
                    <div className="display-box">
                      {outputContent || initialText}
                    </div>
                  </div>

                  {/* Suggestions Section */}
                  <div className="suggestions-section-new">
                    <h3 className="section-label">SUGGESTIONS</h3>
                    <div className="suggestions-row">
                      {suggestions.map((word, index) => (
                        <button
                          key={index}
                          className={`suggestion-chip ${activeArea === "suggestions" && suggestionIndex === index ? "selected" : ""}`}
                          style={{
                            border:
                              activeArea === "suggestions" &&
                              suggestionIndex === index
                                ? "2px solid var(--primary)"
                                : "none",
                            transform:
                              activeArea === "suggestions" &&
                              suggestionIndex === index
                                ? "scale(1.05)"
                                : "scale(1)",
                            transition: "all 0.2s ease",
                            background:
                              activeArea === "suggestions" &&
                              suggestionIndex === index
                                ? "rgba(59, 130, 246, 0.1)"
                                : "#f1f5f9",
                          }}
                          onClick={() => handleSuggestionClick(word)}
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Keyboard Section */}
                  <div className="keyboard-section">
                    {isABCKeyboard ? (
                      <div className="abc-keyboard">
                        {/* Row 1: A to K */}
                        <div className="key-row">
                          {abcKeys[0].map((key, colIndex) => (
                            <button
                              key={key}
                              className={`key-btn-modern ${activeArea === "keyboard" && selectorRow === 0 && selectorCol === colIndex ? "selected" : ""}`}
                              onClick={() => {
                                setActiveArea("keyboard");
                                setSelectorRow(0);
                                setSelectorCol(colIndex);
                                handleKeyClick(key);
                              }}
                            >
                              {key}
                            </button>
                          ))}
                        </div>

                        {/* Row 2: L to T */}
                        <div className="key-row row-offset-1">
                          {abcKeys[1].map((key, colIndex) => (
                            <button
                              key={key}
                              className={`key-btn-modern ${activeArea === "keyboard" && selectorRow === 1 && selectorCol === colIndex ? "selected" : ""}`}
                              onClick={() => {
                                setActiveArea("keyboard");
                                setSelectorRow(1);
                                setSelectorCol(colIndex);
                                handleKeyClick(key);
                              }}
                            >
                              {key}
                            </button>
                          ))}
                        </div>

                        {/* Row 3: U to Z */}
                        <div className="key-row row-offset-2">
                          {abcKeys[2].map((key, colIndex) => (
                            <button
                              key={key}
                              className={`key-btn-modern ${activeArea === "keyboard" && selectorRow === 2 && selectorCol === colIndex ? "selected" : ""}`}
                              onClick={() => {
                                setActiveArea("keyboard");
                                setSelectorRow(2);
                                setSelectorCol(colIndex);
                                handleKeyClick(key);
                              }}
                            >
                              {key}
                            </button>
                          ))}
                        </div>

                        {/* Control Row */}
                        <div className="control-row">
                          <button
                            className="control-btn space-btn"
                            onClick={() => handleKeyClick("SPACE")}
                          >
                            <i className="fas fa-arrow-left"></i> Space
                          </button>
                          <button
                            className="control-btn comma-btn"
                            onClick={() => handleKeyClick(",")}
                          >
                            ,
                          </button>
                          <button
                            className="control-btn period-btn"
                            onClick={() => handleKeyClick(".")}
                          >
                            .
                          </button>
                          <button
                            className="control-btn delete-btn"
                            onClick={() => handleKeyClick("DEL")}
                          >
                            <i className="fas fa-backspace"></i>
                          </button>
                          <button
                            className="control-btn clear-btn"
                            onClick={() => handleKeyClick("CLEAR")}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="num-keyboard">
                        {numKeys.map((row, rowIndex) => (
                          <div key={rowIndex} className="key-row">
                            {row.map((key, colIndex) => (
                              <button
                                key={key}
                                className={`key-btn-modern ${activeArea === "keyboard" && selectorRow === rowIndex && selectorCol === colIndex ? "selected" : ""}`}
                                onClick={() => {
                                  setActiveArea("keyboard");
                                  setSelectorRow(rowIndex);
                                  setSelectorCol(colIndex);
                                  handleKeyClick(key);
                                }}
                              >
                                {key}
                              </button>
                            ))}
                          </div>
                        ))}

                        {/* Control Row */}
                        <div className="control-row">
                          <button
                            className="control-btn space-btn"
                            onClick={() => handleKeyClick("SPACE")}
                          >
                            <i className="fas fa-arrow-left"></i> Space
                          </button>
                          <button
                            className="control-btn comma-btn"
                            onClick={() => handleKeyClick(",")}
                          >
                            ,
                          </button>
                          <button
                            className="control-btn period-btn"
                            onClick={() => handleKeyClick(".")}
                          >
                            .
                          </button>
                          <button
                            className="control-btn delete-btn"
                            onClick={() => handleKeyClick("DEL")}
                          >
                            <i className="fas fa-backspace"></i>
                          </button>
                          <button
                            className="control-btn clear-btn"
                            onClick={() => handleKeyClick("CLEAR")}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Quick Speak Modal */}
      {showModal && (
        <div
          id="quickSpeakModal"
          className="keyboard-modal show"
          onClick={(e) => {
            if (e.target.className === "keyboard-modal show") {
              setShowModal(false);
            }
          }}
        >
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h3 className="modal-title">Quick Speak Phrases</h3>
            <div className="modal-phrases">
              {quickSpeakPhrases.map((phrase, index) => (
                <button
                  key={index}
                  className="phrase-btn"
                  onClick={() => handlePhraseClick(phrase)}
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="keyboard-modal show"
          onClick={(e) => {
            if (e.target.className === "keyboard-modal show") {
              setShowLogoutModal(false);
            }
          }}
        >
          <div className="modal-content" style={{ maxWidth: "400px" }}>
            <span
              className="close-btn"
              onClick={() => setShowLogoutModal(false)}
            >
              &times;
            </span>
            <h3 className="modal-title mb-4 text-center">
              <i className="fas fa-exclamation-triangle text-warning me-2"></i>
              Confirm Logout
            </h3>
            <p className="text-center mb-4">Are you sure you want to logout?</p>
            <div className="d-flex gap-3">
              <button
                className="btn btn-secondary flex-fill"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger flex-fill"
                onClick={async () => {
                  setShowLogoutModal(false);
                  if (currentSessionId) {
                    await endSession();
                  }
                  api.logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div
          className="keyboard-modal show"
          onClick={(e) => {
            if (e.target.className === "keyboard-modal show") {
              setShowSettingsModal(false);
            }
          }}
        >
          <div className="modal-content" style={{ maxWidth: "500px" }}>
            <span
              className="close-btn"
              onClick={() => setShowSettingsModal(false)}
            >
              &times;
            </span>
            <h3 className="modal-title mb-4">Accessibility Settings</h3>

            <div className="mb-4">
              <label className="form-label fw-bold">Gaze Sensitivity</label>
              <input type="range" className="form-range" min="0" max="100" />
              <div className="d-flex justify-content-between small text-muted">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Dwell Time (ms)</label>
              <input
                type="range"
                className="form-range"
                min="200"
                max="2000"
                step="100"
                defaultValue="500"
              />
              <div className="d-flex justify-content-between small text-muted">
                <span>200ms</span>
                <span>2000ms</span>
              </div>
            </div>

            <div className="mb-4 form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="audioFeedback"
                defaultChecked
              />
              <label
                className="form-check-label fw-bold"
                htmlFor="audioFeedback"
              >
                Audio Feedback
              </label>
            </div>

            <div className="mb-4 form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="highContrast"
              />
              <label
                className="form-check-label fw-bold"
                htmlFor="highContrast"
              >
                High Contrast Mode
              </label>
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={() => setShowSettingsModal(false)}
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
