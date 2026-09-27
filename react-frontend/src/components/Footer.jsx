import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";

const Footer = () => {
  return (
    <footer className="mindkey-footer">
      <div className="footer-content-wrapper">
        {/* Info Column */}
        <div className="footer-col footer-col-info">
          <div className="footer-logo">MindKey</div>
          <p className="footer-description">
            MindKey is an assistive AI system designed to empower individuals
            with paralysis and severe motor disabilities. By transforming
            brain-signal patterns into digital commands, we create a
            communication bridge that restores independence, dignity, and human
            connection.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon-link" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon-link" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon-link" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="social-icon-link" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/demo">Demo</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="footer-col">
          <h3 className="footer-heading">Resources</h3>
          <ul className="footer-links">
            <li>
              <a href="#features-section">Features</a>
            </li>
            <li>
              <a href="#faq-section">FAQs</a>
            </li>
            <li>
              <a href="#">Documentation</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-col footer-col-address">
          <h3 className="footer-heading">Contact Us</h3>
          <div className="footer-address-text">
            <p>
              <i className="fas fa-envelope" style={{ marginRight: "8px" }}></i>
              info@mindkey.com
            </p>
            <p>
              <i className="fas fa-phone" style={{ marginRight: "8px" }}></i>
              +1 (555) 123-4567
            </p>
            <p>
              <i
                className="fas fa-map-marker-alt"
                style={{ marginRight: "8px" }}
              ></i>
              123 Innovation Drive
              <br />
              Tech City, TC 12345
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-copyright">
        <p>
          &copy; {new Date().getFullYear()} MindKey. All rights reserved. | Give
          Thought a Voice
        </p>
      </div>
    </footer>
  );
};

export default Footer;
