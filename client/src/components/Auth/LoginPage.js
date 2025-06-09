import React, { useState } from "react";
import { userAPI } from "../../services/api";
import "./LoginPage.css";

const LoginPage = ({ onLogin, onBackToHome }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await userAPI.login(formData.email, formData.password);
      onLogin(user);
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "john.doe@example.com",
      password: "password123",
    });
  };

  return (
    <div className="login-page">
      <div className="login-page__header">
        <button className="login-page__back" onClick={onBackToHome}>
          ← Back to Home
        </button>
        <div className="login-page__logo">
          <div className="logo-icon">B</div>
          <span className="logo-text">BitiBank</span>
        </div>
      </div>

      <div className="login-page__container">
        <div className="login-page__content">
          <div className="login-form">
            <div className="login-form__header">
              <h1 className="login-form__title">Welcome back</h1>
              <p className="login-form__subtitle">
                Sign in to your BitiBank account to access your dashboard
              </p>
            </div>

            {error && <div className="login-form__error">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form__form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span className="checkbox-text">Remember me</span>
                </label>
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="login-form__divider">
              <span>Or</span>
            </div>

            <button
              type="button"
              className="btn btn--secondary btn--full"
              onClick={handleDemoLogin}
            >
              Use Demo Account
            </button>

            <div className="login-form__footer">
              <p>
                Don't have an account?{" "}
                <a href="#" className="signup-link">
                  Sign up for free
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="login-page__visual">
          <div className="login-visual">
            <div className="login-visual__content">
              <h2 className="login-visual__title">
                Secure banking at your fingertips
              </h2>
              <p className="login-visual__description">
                Access your accounts, transfer money, and manage your finances
                with confidence using BitiBank's secure platform.
              </p>

              <div className="security-badges">
                <div className="security-badge">
                  <div className="security-badge__icon">🛡️</div>
                  <span>256-bit SSL</span>
                </div>
                <div className="security-badge">
                  <div className="security-badge__icon">🏦</div>
                  <span>FDIC Insured</span>
                </div>
                <div className="security-badge">
                  <div className="security-badge__icon">🔒</div>
                  <span>Bank-level Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
