import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      id: "mobile",
      icon: "📱",
      title: "Mobile First",
      description: "Bank anywhere, anytime with our award-winning mobile app",
    },
    {
      id: "security",
      icon: "🛡️",
      title: "Bank-Level Security",
      description:
        "Your money is protected with 256-bit encryption and fraud monitoring",
    },
    {
      id: "savings",
      icon: "📈",
      title: "Smart Savings",
      description:
        "Automated savings tools to help you reach your financial goals faster",
    },
    {
      id: "transfers",
      icon: "⚡",
      title: "Instant Transfers",
      description: "Move money between accounts instantly with zero fees",
    },
  ];

  return (
    <section id="features" className="features">
      <div className="features__container">
        <div className="features__header">
          <h2 className="features__title">
            Everything you need to manage your money
          </h2>
          <p className="features__subtitle">
            Powerful features designed to make banking simple, secure, and
            rewarding
          </p>
        </div>

        <div className="features__grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-card__icon">{feature.icon}</div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
