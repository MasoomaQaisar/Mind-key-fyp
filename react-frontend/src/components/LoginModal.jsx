import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "../styles/main.css";

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.login(email, password);
      // Store user info if needed
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      navigate("/dashboard");
      onClose();
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="custom-modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <div className="form-container">
          <h1>Login</h1>
          {error && (
            <div
              style={{ color: "red", marginBottom: "10px", fontSize: "0.9rem" }}
            >
              {error}
            </div>
          )}
          <form className="login-form" id="loginForm" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="loginPassword"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <i
                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} toggle-password`}
                onClick={togglePassword}
                style={{ cursor: "pointer" }}
              ></i>
            </div>

            <div className="forgot-password">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="separator">
            <span>Or</span>
          </div>

          <div className="signup-prompt">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                if (onSwitchToSignup) onSwitchToSignup();
              }}
              className="signup-link"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
