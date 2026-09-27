import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import pic1Img from "../assets/pic1.jpg";
import pic2Img from "../assets/about-background (2).png";
import faqsImg from "../assets/faqs-removebg-preview.png";
import brainheaderImg from "../assets/brainheader.jpg";
import "../styles/main.css";

const About = ({ onLoginClick, onSignupClick }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Update accordion body heights when activeIndex changes
  useEffect(() => {
    if (activeIndex !== null && contentRefs.current[activeIndex]) {
      const element = contentRefs.current[activeIndex];
      // Force a reflow to ensure scrollHeight is calculated
      element.style.maxHeight = `${element.scrollHeight}px`;
    }
  }, [activeIndex]);

  useEffect(() => {
    // 1. Reveal elements (general)
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
      reveals.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        const visiblePoint = window.innerHeight * 0.85;
        if (top < visiblePoint) el.classList.add("active");
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // 2. Left-right reveal
    const revealItems = document.querySelectorAll(
      ".reveal-left, .reveal-right",
    );
    const revealScroll = () => {
      revealItems.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.85) el.classList.add("active");
      });
    };
    window.addEventListener("scroll", revealScroll);
    revealScroll();

    // 3. ABOUT Page Animation (Specific targeting like in HTML)
    const aboutImg = document.querySelector(".about-image-col");
    const aboutText = document.querySelector(".about-text-col");
    const animateAbout = () => {
      const trigger = window.innerHeight * 0.85;
      if (aboutImg && aboutImg.getBoundingClientRect().top < trigger) {
        aboutImg.style.transform = "translateX(0)";
        aboutImg.style.opacity = "1";
      }
      if (aboutText && aboutText.getBoundingClientRect().top < trigger) {
        aboutText.style.transform = "translateX(0)";
        aboutText.style.opacity = "1";
      }
    };
    window.addEventListener("scroll", animateAbout);
    animateAbout();

    // 4. Services heading animation (UPDATED: Removed .features-section prefix to match HTML behavior)
    const servicesHeadings = document.querySelectorAll(
      ".section-tag, .section-title, .section-description",
    );
    const animateServiceHeading = () => {
      servicesHeadings.forEach((h) => {
        if (h.getBoundingClientRect().top < window.innerHeight * 0.85)
          h.classList.add("active");
      });
    };
    window.addEventListener("scroll", animateServiceHeading);
    animateServiceHeading();

    // 5. Services Cards stagger
    const serviceCards = document.querySelectorAll(".service-box"); // Changed from .feature-card to .service-box to match JSX class
    const animateCards = () => {
      let delay = 0;
      serviceCards.forEach((card) => {
        if (
          card.getBoundingClientRect().top < window.innerHeight * 0.9 &&
          !card.classList.contains("show")
        ) {
          setTimeout(() => card.classList.add("show"), delay);
          delay += 200;
        }
      });
    };
    window.addEventListener("scroll", animateCards);
    animateCards();

    // 6. FAQ Intersection Observer
    const faqSection = document.getElementById("faq-section");
    if (faqSection) {
      const contentCol = faqSection.querySelector(".faq-content-col");
      const imageCol = faqSection.querySelector(".faq-image-col");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              contentCol?.classList.add("animate-in");
              imageCol?.classList.add("animate-in");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      );
      observer.observe(faqSection);
    }

    return () => {
      window.removeEventListener("scroll", revealOnScroll);
      window.removeEventListener("scroll", revealScroll);
      window.removeEventListener("scroll", animateAbout);
      window.removeEventListener("scroll", animateServiceHeading);
      window.removeEventListener("scroll", animateCards);
    };
  }, []);

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
          <h1 className="banner-title">About Us</h1>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="about-us-container">
        <div className="about-wrapper">
          <div className="about-image-col reveal-left">
            <div className="image-stack">
              <div className="img-main-placeholder">
                <img src={pic2Img} alt="" />
              </div>
              <div className="img-offset-placeholder">
                <img src={pic1Img} alt="" />
              </div>
            </div>
          </div>

          <div className="about-text-col reveal-right">
            <h2 className="about-title">
              Why You Should Trust Us? Get to Know MindKey
            </h2>

            <p className="about-paragraph">
              MindKey is an assistive AI system designed to empower individuals
              with paralysis and severe motor disabilities. By transforming
              brain-signal patterns into digital commands, we create a
              communication bridge that restores independence, dignity, and
              human connection.
            </p>

            <p className="about-paragraph">
              Our research-driven approach integrates neural signal processing,
              adaptive machine learning, and an intuitive virtual keyboard
              interface. With a focus on safety, accuracy, and accessibility,
              MindKey is built not just as a tool but as a companion for daily
              expression and communication.
            </p>

            <ul className="trust-points">
              <li>
                <i className="fa fa-check-circle"></i> Non-invasive, safe neural
                interaction
              </li>
              <li>
                <i className="fa fa-check-circle"></i> Research-backed EEG
                processing pipeline
              </li>
              <li>
                <i className="fa fa-check-circle"></i> Adaptive AI tailored for
                each user
              </li>
            </ul>

            <a href="#features-section" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="features-section" id="features-section">
        <div className="container">
          <span className="section-tag">Our Services</span>
          <h2 className="section-title">
            We Provide Support Beyond Limitations
          </h2>
          <p className="section-description">
            MindKey is designed to help individuals with paralysis or severe
            motor disabilities communicate independently using AI-powered neural
            interaction. Our focus is dignity, accessibility, and ease of use.
          </p>

          <div className="features-grid">
            {[
              {
                icon: "fa-handshake-o",
                title: "Reliable Assistive Solution",
                desc: "Engineered using validated datasets and signal-processing standards, MindKey offers dependable, real-time communication support for individuals with movement limitations.",
              },
              {
                icon: "fa-money",
                title: "Accessible & Affordable",
                desc: "MindKey provides a cost-effective alternative to invasive or high-end neuroprosthetic systems, making assistive AI communication tools available to wider communities.",
              },
              {
                icon: "fa-bullseye",
                title: "Adaptive AI Interface",
                desc: "Our machine learning engine continuously learns from user-specific EEG patterns, offering personalized typing speed, prediction, and accuracy improvements over time.",
              },
              {
                icon: "fa-headphones",
                title: "Caregiver & Family Assistance",
                desc: "MindKey supports caregivers by reducing communication barriers, improving emotional connection, and enabling smoother daily interactions with the user.",
              },
            ].map((service, index) => (
              <div key={index} className="service-box reveal">
                <div className="feature-icon">
                  <i className={`fa ${service.icon}`}></i>
                </div>
                <h3 className="feature-title">{service.title}</h3>
                <p className="feature-description">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="faq-section" id="faq-section">
        <div className="neural-bg"></div>
        <div className="faq-container">
          <div className="faq-content-col">
            <span className="section-tag"></span>
            <h2 className="section-title">Common Frequently Asked Questions</h2>

            <div className="accordion">
              {[
                {
                  question: "What is MindKey?",
                  answer:
                    "MindKey is an AI-powered assistive communication system that converts EEG signals into digital text, designed for individuals with paralysis or severe motor impairments.",
                },
                {
                  question: "Does the system require a real EEG device?",
                  answer:
                    "No. MindKey currently uses high-quality EEG datasets for model training and simulation. Physical EEG device integration may be implemented in future expansions.",
                },
                {
                  question: "How accurate is the AI model?",
                  answer:
                    "MindKey uses feature extraction, preprocessing, and adaptive machine learning techniques to enhance typing accuracy over time based on user-specific signals.",
                },
                {
                  question: "Is MindKey medically approved?",
                  answer:
                    "MindKey is currently a research-stage system and is not intended for medical diagnosis, treatment, or clinical decision-making.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className={`accordion-item ${activeIndex === index ? "active" : ""}`}
                  data-id={index + 1}
                >
                  <div
                    className="accordion-header"
                    onClick={(e) => toggleAccordion(index, e)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleAccordion(index, e);
                      }
                    }}
                  >
                    <span>{faq.question}</span>
                    <i className="icon fa-solid fa-plus"></i>
                  </div>
                  <div
                    className="accordion-body"
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                    style={{
                      maxHeight:
                        activeIndex === index
                          ? contentRefs.current[index]?.scrollHeight
                            ? `${contentRefs.current[index].scrollHeight}px`
                            : "auto"
                          : "0px",
                    }}
                  >
                    <p className="accordion-body-text">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="faq-image-col">
            <div
              className="illustration-placeholder"
              role="img"
              aria-label="Illustration of people solving problems."
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "400px",
                backgroundImage: `url(${faqsImg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                margin: "0 auto",
                display: "block",
              }}
            ></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
