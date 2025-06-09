import React from "react";
import { getGreeting } from "../../utils/formatters";
import "./DashboardHeader.css";

const DashboardHeader = ({ user }) => {
  if (!user) return null;

  return (
    <div className="dashboard-header">
      <div className="dashboard-header__content">
        <h1 className="dashboard-header__title">
          {getGreeting()}, {user.firstName}
        </h1>
        <p className="dashboard-header__subtitle">
          Here's your financial overview
        </p>
      </div>
      <div className="dashboard-header__icon">📊</div>
    </div>
  );
};

export default DashboardHeader;
