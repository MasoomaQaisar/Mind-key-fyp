import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import videoSrc from "../assets/Mind Reading Keyboard Prototype.mp4";
import brainheaderImg from "../assets/brainheader.jpg";
import "../styles/main.css";

const Demo = ({ onLoginClick, onSignupClick }) => {
  return (
    <div style={{ width: "100%" }}>
      <Navbar onLoginClick={onLoginClick} onSignupClick={onSignupClick} />

      <section
        className="contact-banner"
        style={{ backgroundImage: `url(${brainheaderImg})` }}
      >
        <div className="neural-bg"></div>
        <div className="banner-overlay"></div>
        <div className="contact-container banner-content">
          <h1 className="banner-title">Demo</h1>
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <h2 className="text-center mb-4">Watch the MindKey Demo</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="shadow-lg rounded-3 overflow-hidden">
                <video controls className="w-100">
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-center text-muted mt-3">
                Learn how MindKey can help you or your loved ones.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Demo;
