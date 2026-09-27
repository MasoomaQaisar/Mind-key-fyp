// API Base URL - dynamically use the same hostname as the frontend to avoid IPv6/CORS/PNA issues
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  `http://${window.location.hostname}:8000`;

// Helper functions for auth token
const getAuthToken = () => localStorage.getItem("auth_token");
const setAuthToken = (token) => localStorage.setItem("auth_token", token);
const removeAuthToken = () => localStorage.removeItem("auth_token");

// Helper to create headers
const getHeaders = (includeAuth = true) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (includeAuth) {
    const token = getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// API functions
export const api = {
  // Signup
  async signup(userData) {
    try {
      const url = `${API_BASE_URL}/api/auth/signup`; // Change this if your backend route differs
      console.log("Sending signup request to:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: getHeaders(false),
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        let errorMessage = "Signup failed";
        try {
          const error = await response.json();
          errorMessage = error.detail || JSON.stringify(error);
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (data.access_token) setAuthToken(data.access_token);
      return data;
    } catch (error) {
      if (
        error.message.includes("Failed to fetch") ||
        error.name === "TypeError"
      ) {
        console.error("Network error details:", error);
        throw new Error(
          `Cannot connect to backend at ${API_BASE_URL}. Make sure your FastAPI server is running on port 8000. Test: ${API_BASE_URL}/docs`,
        );
      }
      throw error;
    }
  },

  // Login
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      let msg = error.detail || "Login failed";
      if (Array.isArray(msg)) msg = msg.map((e) => e.msg).join(", ");
      else if (typeof msg === "object") msg = JSON.stringify(msg);
      throw new Error(msg);
    }
    const data = await response.json();
    if (data.access_token) setAuthToken(data.access_token);
    return data;
  },

  // Get current user
  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: getHeaders(true),
    });
    if (!response.ok) {
      // Only remove token and throw auth error for 401/403
      if (response.status === 401 || response.status === 403) {
        removeAuthToken();
        throw new Error("Not authenticated");
      }
      // For other errors, throw with status info
      const error = await response
        .json()
        .catch(() => ({ detail: "Failed to get user" }));
      throw new Error(error.detail || `Server error: ${response.status}`);
    }
    return await response.json();
  },

  logout() {
    removeAuthToken();
  },

  // Dataset folder
  async getDatasetFiles() {
    const response = await fetch(`${API_BASE_URL}/api/dataset/files`, {
      method: "GET",
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch dataset files");
    }
    return await response.json();
  },

  // Upload Dataset
  async uploadDataset(file, metadata) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("patientId", metadata.patientId);
    formData.append("recordingDate", metadata.recordingDate);
    formData.append("sessionType", metadata.sessionType);
    formData.append("notes", metadata.notes);

    const headers = { Accept: "application/json" };
    const token = getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/api/upload/dataset`, {
      method: "POST",
      headers: headers, // FormData automatically sets the correct Content-Type with boundary
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Upload failed");
    }
    return await response.json();
  },

  // Example for predictions (update as needed)
  async predictSignal(eegData, sessionId = null) {
    const response = await fetch(`${API_BASE_URL}/api/prediction/predict`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify({ eeg_data: eegData, session_id: sessionId }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Prediction failed");
    }
    return await response.json();
  },

  // WebSocket for prediction stream
  // Callbacks: { onStreamStart, onPrediction, onComplete, onError, onClose }
  connectPredictionStream(sessionId, patientId, filename, callbacks = {}) {
    const wsUrl =
      API_BASE_URL.replace(/^http/, "ws") +
      `/api/prediction/stream/${sessionId}?patient_id=${encodeURIComponent(patientId)}&filename=${encodeURIComponent(filename)}`;
    console.log("[WS] Connecting to:", wsUrl);
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("[WS] Connected successfully");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "stream_start":
          console.log(`[WS] Stream started: ${data.total_trials} trials`);
          if (callbacks.onStreamStart) callbacks.onStreamStart(data);
          break;
        case "prediction":
          if (callbacks.onPrediction) callbacks.onPrediction(data);
          break;
        case "stream_complete":
          console.log(
            `[WS] Stream complete: ${data.total_trials} trials processed`,
          );
          if (callbacks.onComplete) callbacks.onComplete(data);
          break;
        case "status":
          console.log(`[WS] Status: ${data.message}`);
          break;
        case "error":
          console.error("[WS] Server error:", data.message);
          if (callbacks.onError) callbacks.onError(new Error(data.message));
          break;
        default:
          // Legacy format fallback (no type field) — treat as prediction
          if (data.action) {
            if (callbacks.onPrediction) callbacks.onPrediction(data);
          } else if (data.error) {
            if (callbacks.onError) callbacks.onError(new Error(data.error));
          }
          break;
      }
    };

    ws.onerror = (error) => {
      console.error("[WS] Native error event:", error, "URL was:", wsUrl);
      if (callbacks.onError)
        callbacks.onError(
          new Error(
            "WebSocket connection error. Make sure the backend server is running on port 8000.",
          ),
        );
    };

    ws.onclose = (event) => {
      console.log(
        `[WS] Connection closed. Code: ${event.code}, Reason: ${event.reason}`,
      );
      if (callbacks.onClose) callbacks.onClose(event);
    };

    return ws;
  },

  // Sessions
  async createSession() {
    const response = await fetch(`${API_BASE_URL}/api/sessions/`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to create session");
    }
    const data = await response.json();
    return { ...data, session_id: data.id || data._id };
  },

  async updateSession(sessionId, updates) {
    const response = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}`, {
      method: "PUT",
      headers: getHeaders(true),
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to update session");
    }
    return await response.json();
  },

  async endSession(sessionId) {
    const response = await fetch(
      `${API_BASE_URL}/api/sessions/${sessionId}/end`,
      {
        method: "POST",
        headers: getHeaders(true),
      },
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to end session");
    }
    return await response.json();
  },

  async getUserSessions() {
    const response = await fetch(`${API_BASE_URL}/api/sessions/`, {
      method: "GET",
      headers: getHeaders(true),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to fetch sessions");
    }
    return await response.json();
  },

  // Performance
  async getSessionPerformance(sessionId) {
    const response = await fetch(
      `${API_BASE_URL}/api/performance/session/${sessionId}`,
      {
        method: "GET",
        headers: getHeaders(true),
      },
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to fetch performance");
    }
    return await response.json();
  },

  async getAllPerformance() {
    const response = await fetch(`${API_BASE_URL}/api/performance/`, {
      method: "GET",
      headers: getHeaders(true),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to fetch performance");
    }
    return await response.json();
  },

  async addWordToHistory(sessionId, word) {
    const response = await fetch(
      `${API_BASE_URL}/api/sessions/${sessionId}/add_word`,
      {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify({ word }),
      },
    );
    if (!response.ok) {
      try {
        const error = await response.json();
        throw new Error(error.detail || "Failed to add word");
      } catch (e) {
        throw new Error("Failed to add word");
      }
    }
    return await response.json();
  },
};

export { getAuthToken, setAuthToken, removeAuthToken };
