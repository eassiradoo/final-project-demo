import React from "react";
import "./ActionButtons.css";

const ActionButtons = ({ onDeposit, onWithdraw }) => {
  const actions = [
    {
      id: "deposit",
      label: "Deposit",
      icon: "⬇",
      onClick: onDeposit,
      enabled: true,
      color: "blue",
    },
    {
      id: "withdraw",
      label: "Withdraw",
      icon: "⬆",
      onClick: onWithdraw,
      enabled: true,
      color: "red",
    },
    {
      id: "transfer",
      label: "Transfer",
      icon: "$",
      onClick: () => {},
      enabled: false,
      color: "purple",
    },
    {
      id: "reports",
      label: "Reports",
      icon: "📊",
      onClick: () => {},
      enabled: false,
      color: "green",
    },
  ];

  return (
    <div className="action-buttons">
      {actions.map((action) => (
        <button
          key={action.id}
          className={`action-button action-button--${action.color} ${
            !action.enabled ? "action-button--disabled" : ""
          }`}
          onClick={action.enabled ? action.onClick : undefined}
          disabled={!action.enabled}
        >
          <div className="action-button__icon">{action.icon}</div>
          <span className="action-button__label">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;
