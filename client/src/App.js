import React, { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import LandingPage from "./components/Landing/LandingPage";
import LoginPage from "./components/Auth/LoginPage";
import { ToastProvider } from "./components/UI/Toast";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("landing"); // 'landing', 'login', 'dashboard'
  const [user, setUser] = useState(null);

  const handleSignIn = () => {
    setCurrentView("login");
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView("dashboard");
    // Store user data for persistence
    localStorage.setItem("user", JSON.stringify(userData));
    window.showSuccessToast(`Welcome back, ${userData.firstName}!`);
  };

  const handleBackToHome = () => {
    setCurrentView("landing");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("landing");
    localStorage.removeItem("user");
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage onSignIn={handleSignIn} />;
      case "login":
        return (
          <LoginPage onLogin={handleLogin} onBackToHome={handleBackToHome} />
        );
      case "dashboard":
        return <Dashboard user={user} onLogout={handleLogout} />;
      default:
        return <LandingPage onSignIn={handleSignIn} />;
    }
  };

  return (
    <ToastProvider>
      <div className="App">{renderCurrentView()}</div>
    </ToastProvider>
  );
}

export default App;
