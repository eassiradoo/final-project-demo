import React from 'react';
import './BalanceOverview.css';

const BalanceOverview = ({ balance }) => {
  const formatBalance = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="balance-overview">
      <h2>Current Balance</h2>
      <div className="balance-amount">{formatBalance(balance)}</div>
      <div className="balance-details">
        <div className="balance-detail">
          <span>Available</span>
          <span>{formatBalance(balance)}</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceOverview; 