import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { api } from "../services/api";
import "../styles/main.css";

const PerformanceReport = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        const data = await api.getAllPerformance();

        // Transform data to match component structure
        const transformedSessions = data.map((session, index) => {
          const metrics = session.metrics || {
            accuracy: 0,
            recall: 0,
            precision: 0,
            f1_score: 0,
          };

          return {
            id: session.id || `session-${index + 1}`,
            sessionNumber: String(session.session_number || index + 1).padStart(
              3,
              "0",
            ),
            date: session.date
              ? session.date.split("T")[0] || session.date
              : new Date().toISOString().split("T")[0],
            startTime: session.start_time
              ? new Date(session.start_time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A",
            duration: session.duration || "N/A",
            wordsTyped: session.words_typed || 0,
            characters: session.characters || 0,
            quickPhrases: session.quick_phrases || 0,
            suggestions: session.suggestions || 0,
            metrics: {
              accuracy: metrics.accuracy || 0,
              recall: metrics.recall || 0,
              precision: metrics.precision || 0,
              f1Score: metrics.f1_score || metrics.f1Score || 0,
            },
          };
        });

        setSessions(transformedSessions);
      } catch (err) {
        console.error("Error fetching performance data:", err);
        setError(err.message);
        // Keep empty array on error
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  // Calculate overall metrics (average of all sessions)
  const overallMetrics =
    sessions.length > 0
      ? {
          accuracy:
            sessions.reduce((sum, s) => sum + s.metrics.accuracy, 0) /
            sessions.length,
          recall:
            sessions.reduce((sum, s) => sum + s.metrics.recall, 0) /
            sessions.length,
          precision:
            sessions.reduce((sum, s) => sum + s.metrics.precision, 0) /
            sessions.length,
          f1Score:
            sessions.reduce((sum, s) => sum + s.metrics.f1Score, 0) /
            sessions.length,
        }
      : {
          accuracy: 0,
          recall: 0,
          precision: 0,
          f1Score: 0,
        };

  // Progress bar component
  const ProgressBar = ({ value, color }) => (
    <div
      style={{
        width: "100%",
        height: "6px",
        backgroundColor: "#e5e7eb",
        borderRadius: "3px",
        overflow: "hidden",
        marginTop: "8px",
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          backgroundColor: color,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );

  // Metric icon component
  const MetricIcon = ({ type, color }) => {
    const icons = {
      accuracy: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      recall: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      precision: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      f1score: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
        >
          <path d="M3 3v18h18" />
          <path d="M18 17l-5-5-5 5" />
        </svg>
      ),
    };
    return icons[type] || null;
  };

  // Generate PDF for a specific session
  const generatePDF = async (session) => {
    const elementId = `session-card-${session.id}`;
    const btnId = `download-btn-${session.id}`;

    const element = document.getElementById(elementId);
    const btn = document.getElementById(btnId);

    if (!element) {
      console.error("Element not found");
      return;
    }

    try {
      // Hide the download button during capture
      if (btn) btn.style.display = "none";

      // Capture the element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      // Show the button again
      if (btn) btn.style.display = "flex";

      const imgData = canvas.toDataURL("image/png");

      // Calculate dimensions to fit A4 width
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      // A4 dimensions: 210 x 297 mm
      const margin = 10;
      const contentWidth = pdfWidth - margin * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      // Add a simple header
      pdf.setFontSize(16);
      pdf.setTextColor(44, 62, 80);
      pdf.text("Performance Report", pdfWidth / 2, 15, { align: "center" });

      // Add the captured image
      pdf.addImage(imgData, "PNG", margin, 25, contentWidth, contentHeight);

      // Save the PDF
      pdf.save(
        `Performance_Report_Session_${session.sessionNumber}_${session.date.replace(/\//g, "-")}.pdf`,
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Ensure button is restored on error
      if (btn) btn.style.display = "flex";
    }
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f8f9fa",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ marginTop: "1rem", color: "#7f8c8d" }}>
            Loading performance data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f8f9fa",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "#e74c3c" }}>
          <p>Error loading performance data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f8f9fa",
        padding: "2rem",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#2c3e50",
              marginBottom: "0.5rem",
            }}
          >
            Performance Analytics
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#7f8c8d",
              marginBottom: "1rem",
            }}
          >
            User Session Reports & Metrics Dashboard
          </p>
          <div
            style={{
              display: "inline-block",
              background: "white",
              padding: "0.5rem 1.5rem",
              borderRadius: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              fontSize: "0.9rem",
              color: "#4A90E2",
              fontWeight: "600",
            }}
          >
            Total Sessions: {sessions.length}
          </div>
        </div>

        {/* Overall Performance Metrics */}
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#2c3e50",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4A90E2"
              strokeWidth="2"
            >
              <line x1="12" y1="20" x2="12" y2="10" />
              <line x1="18" y1="20" x2="18" y2="4" />
              <line x1="6" y1="20" x2="6" y2="16" />
            </svg>
            Overall Performance Metrics
          </h2>
          <div className="row g-3">
            {[
              {
                label: "Accuracy",
                value: overallMetrics.accuracy,
                color: "#4A90E2",
                type: "accuracy",
              },
              {
                label: "Recall",
                value: overallMetrics.recall,
                color: "#2ecc71",
                type: "recall",
              },
              {
                label: "Precision",
                value: overallMetrics.precision,
                color: "#9b59b6",
                type: "precision",
              },
              {
                label: "F1 Score",
                value: overallMetrics.f1Score,
                color: "#e67e22",
                type: "f1score",
              },
            ].map((metric, idx) => (
              <div key={idx} className="col-md-3 col-sm-6">
                <div
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "1.25rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.08)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: `${metric.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MetricIcon type={metric.type} color={metric.color} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#7f8c8d",
                          fontWeight: "500",
                        }}
                      >
                        {metric.label}
                      </div>
                      <div
                        style={{
                          fontSize: "1.6rem",
                          fontWeight: "700",
                          color: "#2c3e50",
                        }}
                      >
                        {metric.value.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <ProgressBar value={metric.value} color={metric.color} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session Reports */}
        <div>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#2c3e50",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4A90E2"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Session Reports
          </h2>

          {sessions.map((session, idx) => (
            <div
              key={session.id}
              id={`session-card-${session.id}`}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "1.25rem",
                marginBottom: "1.25rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
              }}
            >
              {/* Session Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.25rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid #ecf0f1",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: "700",
                      color: "#2c3e50",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Session {session.sessionNumber}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      fontSize: "0.8rem",
                      color: "#7f8c8d",
                    }}
                  >
                    <span>📅 {session.date}</span>
                    <span>🕐 {session.startTime}</span>
                    <span>⏱️ {session.duration}</span>
                  </div>
                </div>
                <button
                  id={`download-btn-${session.id}`}
                  onClick={() => generatePDF(session)}
                  style={{
                    background: "#4A90E2",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.6rem 1.5rem",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 8px rgba(74, 144, 226, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#357ABD";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(74, 144, 226, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#4A90E2";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(74, 144, 226, 0.3)";
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </button>
              </div>

              {/* Session Statistics */}
              <div className="row g-2 mb-3">
                {[
                  { label: "Words Typed", value: session.wordsTyped },
                  { label: "Characters", value: session.characters },
                  { label: "Quick Phrases", value: session.quickPhrases },
                  { label: "Suggestions", value: session.suggestions },
                ].map((stat, statIdx) => (
                  <div key={statIdx} className="col-md-3 col-sm-6">
                    <div
                      style={{
                        background: "#f8f9fa",
                        borderRadius: "8px",
                        padding: "0.9rem",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{ fontSize: "1.3rem", marginBottom: "0.25rem" }}
                      >
                        {stat.icon}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#7f8c8d",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {stat.label}
                      </div>
                      <div
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: "700",
                          color: "#2c3e50",
                        }}
                      >
                        {stat.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Session Metrics */}
              <div className="row g-2">
                {[
                  {
                    label: "Accuracy",
                    value: session.metrics.accuracy,
                    color: "#4A90E2",
                  },
                  {
                    label: "Recall",
                    value: session.metrics.recall,
                    color: "#2ecc71",
                  },
                  {
                    label: "Precision",
                    value: session.metrics.precision,
                    color: "#9b59b6",
                  },
                  {
                    label: "F1 Score",
                    value: session.metrics.f1Score,
                    color: "#e67e22",
                  },
                ].map((metric, metricIdx) => (
                  <div key={metricIdx} className="col-md-3 col-sm-6">
                    <div
                      style={{
                        background: `${metric.color}10`,
                        borderLeft: `4px solid ${metric.color}`,
                        borderRadius: "6px",
                        padding: "0.7rem 1rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#7f8c8d",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {metric.label}
                      </div>
                      <div
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: "700",
                          color: metric.color,
                        }}
                      >
                        {metric.value.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceReport;
