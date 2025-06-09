import React from 'react';
import './RecentTransactions.css';

const RecentTransactions = ({ transactions, dateRange }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= dateRange.startDate && 
           transactionDate <= dateRange.endDate;
  });

  return (
    <div className="recent-transactions">
      <h2>Recent Transactions</h2>
      <div className="transactions-list">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-title">{transaction.description}</div>
              <div className="transaction-date">{formatDate(transaction.date)}</div>
            </div>
            <div className={`transaction-amount ${transaction.amount < 0 ? 'negative' : 'positive'}`}>
              {formatAmount(transaction.amount)}
            </div>
          </div>
        ))}
        {filteredTransactions.length === 0 && (
          <div className="no-transactions">
            No transactions found for the selected date range
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions; 