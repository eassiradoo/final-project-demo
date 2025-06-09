import React from "react";
import { formatCurrency, formatAccountNumber } from "../../utils/formatters";
import "./AccountCard.css";

const AccountCard = ({ account, type }) => {
  if (!account) {
    return (
      <div
        className={`account-card account-card--${type} account-card--loading`}
      >
        <div className="account-card__header">
          <div className="account-card__icon">
            {type === "checking" ? "💳" : "🐷"}
          </div>
          <div className="account-card__plus">+</div>
        </div>
        <div className="account-card__type">
          {type === "checking" ? "Checking Account" : "Savings Account"}
        </div>
        <div className="account-card__number">{formatAccountNumber(type)}</div>
        <div className="account-card__balance">Loading...</div>
        <div className="account-card__label">Available Balance</div>
      </div>
    );
  }

  return (
    <div className={`account-card account-card--${type}`}>
      <div className="account-card__header">
        <div className="account-card__icon">
          {type === "checking" ? "💳" : "🐷"}
        </div>
        <div className="account-card__plus">+</div>
      </div>
      <div className="account-card__type">
        {type === "checking" ? "Checking Account" : "Savings Account"}
      </div>
      <div className="account-card__number">{formatAccountNumber(type)}</div>
      <div className="account-card__balance">
        {formatCurrency(account.balance)}
      </div>
      <div className="account-card__label">Available Balance</div>
    </div>
  );
};

export default AccountCard;
