import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import brainheaderImg from "../assets/brainheader.jpg";
import "../styles/main.css";

const Contact = ({ onLoginClick, onSignupClick }) => {
  const currentYear = new Date().getFullYear();

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
          <h1 className="banner-title">Contact Us</h1>
        </div>
      </section>

      <section className="info-cards-section contact-container">
        <div className="info-cards-wrapper">
          <div className="info-card">
            <i className="fa fa-map-marker"></i>
            <span className="card-text">Address</span>
            <span className="card-subtext">MindKey Rawalpindi, Pakistan</span>
          </div>

          <div className="info-card">
            <i className="fa fa-phone"></i>
            <span className="card-text">Call Us Now</span>
            <span className="card-subtext">+012 345 6789</span>
          </div>

          <div className="info-card">
            <i className="fa fa-envelope"></i>
            <span className="card-text">Mail Us Now</span>
            <span className="card-subtext"> support@mindkey.ai</span>
          </div>
        </div>
      </section>

      <section className="form-map-section contact-container">
        <div className="form-map-wrapper">
          <div className="contact-form-col">
            <h2 className="form-title">Have Any Query? Please Contact Us!</h2>
            <p className="small text-muted form-description">
              The contact form is currently inactive. Get a functional and
              working contact form with Ajax & PHP in a few minutes. Just copy
              and paste the files, add a little code and you're done.
            </p>

            <form>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Message" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>

          <div className="map-col">
            <div className="map-placeholder">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106637.3005898869!2d72.95543669145943!3d33.58550186938923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9480b065ccdf%3A0xc48644534a70650d!2sRawalpindi%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1709230537443!5m2!1sen!2s"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
