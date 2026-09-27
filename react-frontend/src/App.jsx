import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Import all pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/Demo";

// Import modals
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import BackendStatus from "./components/BackendStatus";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLoginClick = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleSignupClick = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  return (
    <div className="App" style={{ width: "100%", minHeight: "100vh" }}>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onLoginClick={handleLoginClick}
              onSignupClick={handleSignupClick}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              onLoginClick={handleLoginClick}
              onSignupClick={handleSignupClick}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact
              onLoginClick={handleLoginClick}
              onSignupClick={handleSignupClick}
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/demo"
          element={
            <Demo
              onLoginClick={handleLoginClick}
              onSignupClick={handleSignupClick}
            />
          }
        />
      </Routes>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseModals}
        onSwitchToSignup={handleSignupClick}
      />
      <SignupModal
        isOpen={showSignupModal}
        onClose={handleCloseModals}
        onSwitchToLogin={handleLoginClick}
      />
      <BackendStatus />
    </div>
  );
}

export default App;
