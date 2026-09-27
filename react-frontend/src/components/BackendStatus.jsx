import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const BackendStatus = () => {
  const [status, setStatus] = useState("checking"); // checking, connected, disconnected
  const [latency, setLatency] = useState(null);

  const checkHealth = async () => {
    const start = Date.now();
    try {
      // We'll assume there's a health endpoint or just try a simple fetch
      // The api.js doesn't have a specific health check exposed, but we can try a simple fetch to the base URL or a known endpoint.
      // Let's use a direct fetch to the health endpoint we saw in main.py: /api/health
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${API_BASE_URL}/api/health`);

      if (response.ok) {
        setStatus("connected");
        setLatency(Date.now() - start);
      } else {
        setStatus("disconnected");
        setLatency(null);
      }
    } catch (error) {
      setStatus("disconnected");
      setLatency(null);
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (status === "checking") return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 15px",
        borderRadius: "20px",
        backgroundColor:
          status === "connected"
            ? "rgba(220, 252, 231, 0.9)"
            : "rgba(254, 226, 226, 0.9)",
        border: `1px solid ${status === "connected" ? "#86efac" : "#fca5a5"}`,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        zIndex: 9999,
        fontSize: "14px",
        color: status === "connected" ? "#166534" : "#991b1b",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: status === "connected" ? "#16a34a" : "#dc2626",
        }}
      />
      <span style={{ fontWeight: 500 }}>
        {status === "connected" ? "Backend Connected" : "Backend Disconnected"}
      </span>
      {latency && (
        <span style={{ fontSize: "12px", opacity: 0.8 }}>({latency}ms)</span>
      )}
    </div>
  );
};

export default BackendStatus;
