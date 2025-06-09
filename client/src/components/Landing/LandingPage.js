import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import FeaturesSection from "./FeaturesSection";
import SecuritySection from "./SecuritySection";
import Footer from "./Footer";
import "./LandingPage.css";

const LandingPage = ({ onSignIn }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page">
      <Header onSignIn={onSignIn} onNavigate={scrollToSection} />
      <HeroSection onViewDemo={() => scrollToSection("features")} />
      <StatsSection />
      <FeaturesSection />
      <SecuritySection />
      <Footer />
    </div>
  );
};

export default LandingPage;
