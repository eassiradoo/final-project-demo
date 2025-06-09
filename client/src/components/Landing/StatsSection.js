import React from "react";

const StatsSection = () => {
  return (
    <section className="stats">
      <div className="stats__container">
        <div className="stat">
          <div className="stat__number">2M+</div>
          <div className="stat__label">Happy Customers</div>
        </div>

        <div className="stat">
          <div className="stat__number">4.9★</div>
          <div className="stat__label">App Store Rating</div>
        </div>

        <div className="stat">
          <div className="stat__number">$0</div>
          <div className="stat__label">Monthly Fees</div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
