import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "../styles/main.css";

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    medical_condition: "",
    guardian_name: "",
    consent: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordError("");

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (!formData.consent) {
      setError("Please consent to share medical information");
      return;
    }

    setLoading(true);

    try {
      // Validate age
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 5 || age > 120) {
        setError("Please enter a valid age between 5 and 120");
        setLoading(false);
        return;
      }

      const signupData = {
        email: formData.email.trim(),
        full_name: formData.full_name.trim(),
        password: formData.password,
        age: age,
        medical_condition: formData.medical_condition,
        guardian_name: formData.guardian_name.trim(),
        consent: formData.consent,
      };

      console.log("Sending signup request:", {
        ...signupData,
        password: "***",
      }); // Debug log
      const response = await api.signup(signupData);
      // Store user info if needed
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      navigate("/dashboard");
      onClose();
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
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
          <h1>Signup</h1>
          {error && (
            <div
              style={{ color: "red", marginBottom: "10px", fontSize: "0.9rem" }}
            >
              {error}
            </div>
          )}

          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              required
              value={formData.full_name}
              onChange={handleChange}
              disabled={loading}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create Password"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              <i
                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} toggle-password`}
                id="eye1"
                onClick={() => togglePassword("password")}
                style={{ cursor: "pointer" }}
              ></i>
            </div>

            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
              <i
                className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"} toggle-password`}
                id="eye2"
                onClick={() => togglePassword("confirmPassword")}
                style={{ cursor: "pointer" }}
              ></i>
            </div>

            <p
              id="passError"
              style={{
                color: "red",
                fontSize: "13px",
                marginTop: "-10px",
                marginBottom: "10px",
              }}
            >
              {passwordError}
            </p>

            <input
              type="number"
              name="age"
              placeholder="Age"
              min="5"
              max="120"
              required
              value={formData.age}
              onChange={handleChange}
              disabled={loading}
            />

            <select
              name="medical_condition"
              required
              value={formData.medical_condition}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="" disabled>
                Select Medical Condition
              </option>
              <option value="ALS">ALS</option>
              <option value="Stroke">Stroke</option>
              <option value="Paralysis">Paralysis</option>
              <option value="Spinal Injury">Spinal Injury</option>
              <option value="Others">Others</option>
            </select>

            <input
              type="text"
              name="guardian_name"
              placeholder="Guardian Name"
              required
              value={formData.guardian_name}
              onChange={handleChange}
              disabled={loading}
            />

            <div className="consent-box">
              <input
                type="checkbox"
                name="consent"
                required
                checked={formData.consent}
                onChange={handleChange}
                disabled={loading}
              />
              <label>
                I consent to share medical information for assistive technology
                usage.
              </label>
            </div>

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>

          <div className="separator">
            <span>Or</span>
          </div>

          <div className="login-prompt">
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                onSwitchToLogin();
              }}
              className="login-link"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
