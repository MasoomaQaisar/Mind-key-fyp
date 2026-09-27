import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ onLoginClick, onSignupClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (onLoginClick) {
      onLoginClick();
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    if (onSignupClick) {
      onSignupClick();
    }
  };

  return (
    <nav
      id="mainNav"
      className={`navbar navbar-expand-lg sticky-top ${isScrolled ? "shadowed" : ""}`}
    >
      <div className="container-lg">
        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/"
          aria-label="MindKey home"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="6" fill="#1A73E8"></circle>
            <circle cx="12" cy="8" r="3.2" fill="#fff"></circle>
          </svg>
          <span
            className="fw-bold"
            style={{ color: "var(--primary)", fontSize: "1.05rem" }}
          >
            MindKey
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navCollapse"
          aria-controls="navCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navCollapse"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/about") ? "active" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/demo") ? "active" : ""}`}
                to="/demo"
              >
                Demo
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            onClick={handleLoginClick}
            className="btn btn-outline-primary"
            id="loginBtn"
          >
            Login
          </button>
          <button
            onClick={handleSignupClick}
            className="btn btn-primary"
            id="signupBtn"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
