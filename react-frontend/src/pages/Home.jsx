import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import brainHeaderImg from "../assets/brain.png";
import wearEEGImg from "../assets/wearEEG.jpeg";
import signalProcessingImg from "../assets/signalprocessing.jpeg";
import conversionImg from "../assets/conversion.png";
import user1Img from "../assets/user1.jpg";
import user2Img from "../assets/user2.jpg";
import user3Img from "../assets/user3.png";
import user21Img from "../assets/user21.jpg";
import eegHeadsetImg from "../assets/eeg-headset.jpg";
import "../styles/main.css";

const Home = ({ onLoginClick, onSignupClick }) => {
  const [typedText, setTypedText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const testimonialContainerRef = useRef(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const phrases = [
    "Think to Speak",
    "Neural Communication",
    "Assistive AI for Paralysis",
    "Restore Dignity",
  ];

  const testimonials = [
    {
      name: "Ayesha Khalid",
      title: "Patient",
      text: "For the first time after my injury, I told my daughter 'I love you' — by myself.",
      image: user1Img,
    },
    {
      name: "Saad Ahmed",
      title: "Caregiver",
      text: "The system felt private, secure and empowering — like my independence returned.",
      image: user2Img,
    },
    {
      name: "Dr. Sarah",
      title: "Clinical Therapist",
      text: "Real-time neural decoding enabled meaningful communication for our patient.",
      image: user3Img,
    },
    {
      name: "Dr. Maria",
      title: "Research Participant",
      text: "AI calibration helped me communicate more accurately and faster.",
      image: user21Img,
    },
    {
      name: "Hira Nadeem",
      title: "Participant",
      text: "Non-invasive EEG gave me freedom without discomfort.",
      image: user2Img,
    },
    {
      name: "Fatima Noor",
      title: "Caregiver",
      text: "The caregiver dashboard made monitoring effortless.",
      image: user1Img,
    },
  ];

  // Typed text animation
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-quart" });

    const typingInterval = setInterval(() => {
      const currentPhrase = phrases[currentPhraseIndex];

      if (isTyping) {
        if (currentCharIndex < currentPhrase.length) {
          setTypedText(currentPhrase.slice(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setIsTyping(true);
            setCurrentCharIndex(0);
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          }, 900);
        }
      }
    }, 70);

    return () => clearInterval(typingInterval);
  }, [currentPhraseIndex, currentCharIndex, isTyping]);

  // Testimonial slider
  useEffect(() => {
    const updateDisplay = () => {
      if (
        testimonialContainerRef.current &&
        testimonialContainerRef.current.children.length > 0
      ) {
        const cardWidth =
          testimonialContainerRef.current.children[0].offsetWidth + 30;
        testimonialContainerRef.current.scrollTo({
          left: currentTestimonialIndex * cardWidth,
          behavior: "smooth",
        });
      }
    };

    updateDisplay();
    window.addEventListener("resize", updateDisplay);
    return () => window.removeEventListener("resize", updateDisplay);
  }, [currentTestimonialIndex]);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev < testimonials.length - 3 ? prev + 1 : 0,
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev > 0 ? prev - 1 : testimonials.length - 3,
    );
  };

  // Auto-play testimonials
  useEffect(() => {
    const autoPlay = setInterval(nextTestimonial, 6000);
    return () => clearInterval(autoPlay);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Navbar onLoginClick={onLoginClick} onSignupClick={onSignupClick} />

      {/* HERO */}
      <header id="home" className="hero" role="banner" aria-label="Main banner">
        <div className="neural-bg" aria-hidden="true"></div>

        {/* HERO  <div className="floating-icon" style={{ left: '6%', top: '18%' }} aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2C8 2 6 5 6 8c0 3 2 6 6 8s6-5 6-8c0-3-2-6-6-6z" fill="#1A73E8" />
            <circle cx="12" cy="8" r="2.2" fill="#fff" />
          </svg>
        </div>
        <div className="floating-icon" style={{ left: '28%', top: '6%', width: '56px', height: '56px', borderRadius: '14px' }} aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="4" fill="#fff" />
            <path d="M7 12h10" stroke="#1A73E8" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
        */}

        <div className="container-lg" style={{ zIndex: 5 }}>
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration="900"
            >
              <div className="eyebrow">
                Non-invasive · Privacy-first · Medical-grade accessibility
              </div>
              <h1>
                Give Thought a{" "}
                <span style={{ color: "var(--primary)" }}>Voice.</span>
              </h1>
              <p className="lead">
                AI-powered brain-to-text system enabling paralyzed individuals
                to communicate naturally using neural signals.
              </p>

              <div className="d-flex gap-3 mt-4 flex-wrap">
                <Link
                  className="btn btn-primary"
                  onClick={onLoginClick}
                  role="button"
                >
                  Try Demo
                </Link>
                <Link
                  className="btn btn-outline-primary d-inline-flex align-items-center"
                  to="../demo"
                  role="button"
                  aria-label="Watch overview"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="me-2"
                  >
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>{" "}
                  Watch Overview
                </Link>
              </div>

              <div className="mt-4">
                <span
                  className="typed"
                  id="typedPlaceholder"
                  aria-live="polite"
                >
                  {typedText}
                </span>
                <span className="typing-cursor" aria-hidden="true"></span>
              </div>
            </div>

            <div
              className="col-lg-6 d-flex justify-content-center"
              data-aos="fade-left"
              data-aos-duration="900"
            >
              <img
                src={brainHeaderImg}
                alt="Brain neural network animation"
                style={{
                  width: "100%",
                  maxWidth: "450px",
                  height: "auto",
                  borderRadius: "12px",
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT / PROBLEM & STATS */}
      <section id="about" className="py-5 about-full">
        <div className="container-lg h-100 d-flex flex-column align-items-center">
          <h1
            className="fw-bold text-primary text-center mb-5"
            data-aos="fade-up"
          >
            Problem & Mission
          </h1>

          <div className="row g-5 align-items-center w-100">
            <div className="col-md-6" data-aos="fade-up">
              <div className="about-img-wrapper">
                <img
                  src={eegHeadsetImg}
                  alt="Patient and caregiver in clinical setting"
                  className="img-fluid rounded-3 shadow"
                />
              </div>
            </div>

            <div className="col-md-6" data-aos="fade-up" data-aos-delay="120">
              <h2 className="fw-bold mb-3 text-dark">
                When movement is lost, communication shouldn't be.
              </h2>

              <p className="text-muted fs-5">
                Millions of individuals with paralysis, ALS, spinal cord
                injuries, and neurological disorders struggle to express their
                thoughts.
                <strong>MindKey bridges the gap</strong> through breakthrough
                brain-signal-to-text intelligence restoring dignity,
                independence, and connection.
              </p>

              <div className="row gx-4 gy-4 mt-4 stats-row">
                <div className="col-4">
                  <div className="stat-box">
                    <div className="stat-value">75M+</div>
                    <div className="stat-label">
                      People need assistive communication
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="stat-box">
                    <div className="stat-value">85%</div>
                    <div className="stat-label">
                      Face barriers to natural communication
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="stat-box">
                    <div className="stat-value">AI</div>
                    <div className="stat-label">Unlocks autonomy & hope</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="how-it-works-section position-relative"
        style={{ height: "80vh", overflow: "hidden", paddingTop: 0 }}
      >
        <div className="neural-bg" aria-hidden="true"></div>

        <div
          className="container-lg h-100 d-flex flex-column align-items-center justify-content-center position-relative"
          style={{ zIndex: 2 }}
        >
          <h1
            className="fw-bold text-primary text-center mb-4 mt-0"
            data-aos="fade-up"
          >
            How It Works
          </h1>

          <div className="row g-4 justify-content-center w-100 mt-2">
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="0">
              <div className="card border-0 text-center rounded-4 how-card p-3">
                <img
                  src={wearEEGImg}
                  alt="Patient undergoing EEG test"
                  className="img-fluid rounded-4 mb-3"
                />
                <h5 className="mt-2">Wear EEG Band</h5>
                <p className="small text-muted">
                  {" "}
                  A non-invasive EEG headset captures the user’s real-time
                  brainwave activity.
                </p>
              </div>
            </div>

            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="card border-0 text-center rounded-4 how-card p-3">
                <img
                  src={signalProcessingImg}
                  alt="Signal processing"
                  className="img-fluid rounded-4 mb-3"
                />
                <h5 className="mt-2">Signal Processing</h5>
                <p className="small text-muted">
                  EEG data is filtered and processed, extracting meaningful
                  neural features.
                </p>
              </div>
            </div>

            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="card border-0 text-center rounded-4 how-card p-3">
                <img
                  src={conversionImg}
                  alt="AI conversion"
                  className="img-fluid rounded-4 mb-3"
                />
                <h5 className="mt-2">Mind-to-Text Conversion</h5>
                <p className="small text-muted">
                  {" "}
                  The AI model interprets neural intent and converts it into
                  text on the virtual keyboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section
        id="features"
        className="py-5"
        style={{ height: "80vh", display: "flex", alignItems: "center" }}
      >
        <div className="container-lg text-center">
          <h1 className="fw-bold text-primary mb-4" data-aos="fade-up">
            Core Features
          </h1>
          <p className="text-muted mb-5" data-aos="fade-up">
            Built for real use in clinics, homes, and research labs.
          </p>

          <div className="row g-4 justify-content-center">
            {[
              {
                title: "Real-time Neural Decoding",
                desc: "Fast, low-latency mapping of brain patterns to text candidates.",
              },
              {
                title: "Personal AI Calibration",
                desc: "AI adapts to each user’s neural patterns for higher accuracy.",
              },
              {
                title: "Privacy-by-Design",
                desc: "Encrypted EEG storage and role-based access control.",
              },
              {
                title: "Accessible Interface",
                desc: "Large keys, contrast-rich UI, and caregiver-friendly tools.",
              },
              {
                title: "Performance Monitoring",
                desc: "Reports on accuracy, progress, and model performance.",
              },
              {
                title: "AI-Powered Pipeline",
                desc: "End-to-end EEG preprocessing, feature extraction, and prediction.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="col-md-4"
                data-aos="fade-up"
                data-aos-delay={index * 30}
              >
                <div className="feature-card p-4 rounded-4 h-100">
                  <h5 className="mt-2 fw-semibold">{feature.title}</h5>
                  <p className="text-muted small">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonial-section" id="testiContainer">
        <div className="container-lg text-center mb-5" data-aos="fade-up">
          <h1 className="fw-bold text-primary mb-3">Testimonials</h1>
          <p className="text-muted mb-4">
            Hear what our users and participants have to say about our system.
          </p>
        </div>
        <div className="slider-wrapper">
          <button
            className="slider-btn left-btn"
            id="prevTest"
            onClick={prevTestimonial}
          >
            &#10094;
          </button>

          <div
            className="testimonial-container"
            id="testimonial-container"
            ref={testimonialContainerRef}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="user-image-wrapper">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="user-image"
                  />
                </div>
                <p className="quote-text">{testimonial.text}</p>
                <div className="quote-icon">"</div>
                <h3 className="user-name">{testimonial.name}</h3>
                <p className="user-title">{testimonial.title}</p>
                <div
                  className="text-muted small mt-2"
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  Clinical Study — anonymized
                </div>
              </div>
            ))}
          </div>

          <button
            className="slider-btn right-btn"
            id="nextTest"
            onClick={nextTestimonial}
          >
            &#10095;
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5">
        <div className="container-lg">
          <div className="big-cta text-center p-4 rounded-3">
            <h3 style={{ marginBottom: ".4rem" }}>
              Ready to empower someone's voice?
            </h3>
            <p className="text-white small mb-3">
              Start exploring our brain-to-text communication platform.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link
                className="btn btn-outline-primary d-inline-flex align-items-center"
                to="/demo"
                role="button"
                style={{ borderColor: "white", color: "white" }}
              >
                Explore Demo
              </Link>
              <button
                className="btn btn-outline-primary d-inline-flex align-items-center"
                onClick={onLoginClick}
                style={{ borderColor: "white", color: "rgb(255, 255, 255)" }}
              >
                Request Medical Access
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
