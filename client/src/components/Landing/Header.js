import React from "react";

const Header = ({ onSignIn, onNavigate }) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <div className="logo-icon">B</div>
          <span className="logo-text">BitiBank</span>
        </div>

        <nav className="header__nav">
          <button className="nav-link" onClick={() => onNavigate("features")}>
            Features
          </button>
          <button className="nav-link" onClick={() => onNavigate("security")}>
            Security
          </button>
          <button className="nav-link" onClick={() => onNavigate("reviews")}>
            Reviews
          </button>
          <button className="nav-link" onClick={() => onNavigate("contact")}>
            Contact
          </button>
        </nav>

        <div className="header__actions">
          <button className="btn btn--text" onClick={onSignIn}>
            Sign In
          </button>
          <button className="btn btn--primary">Get Started</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
