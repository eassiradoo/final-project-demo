import React from "react";
import { formatCurrency, formatRelativeDate } from "../../utils/formatters";
import "./RecentTransactions.css";

const RecentTransactions = ({ transactions, loading }) => {
  if (loading) {
    return (
      <div className="recent-transactions">
        <div className="recent-transactions__header">
          <h2 className="recent-transactions__title">Recent Transactions</h2>
          <p className="recent-transactions__subtitle">
            Your latest account activity
          </p>
        </div>
        <div className="recent-transactions__loading">
          Loading transactions...
        </div>
      </div>
    );
  }

  return (
    <div className="recent-transactions">
      <div className="recent-transactions__header">
        <h2 className="recent-transactions__title">Recent Transactions</h2>
        <p className="recent-transactions__subtitle">
          Your latest account activity
        </p>
      </div>

      <div className="recent-transactions__list">
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-item__icon">
                <div
                  className={`transaction-icon transaction-icon--${transaction.type}`}
                >
                  {transaction.type === "deposit" ? "⬇" : "⬆"}
                </div>
              </div>

              <div className="transaction-item__details">
                <div className="transaction-item__description">
                  {transaction.description ||
                    (transaction.type === "deposit" ? "Deposit" : "Withdrawal")}
                </div>
                <div className="transaction-item__meta">
                  {transaction.accountType
                    ? `${
                        transaction.accountType.charAt(0).toUpperCase() +
                        transaction.accountType.slice(1)
                      } • `
                    : ""}
                  {formatRelativeDate(transaction.createdAt)}
                </div>
              </div>

              <div
                className={`transaction-item__amount transaction-item__amount--${transaction.type}`}
              >
                {transaction.type === "deposit" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))
        ) : (
          <div className="recent-transactions__empty">
            <div className="recent-transactions__empty-icon">📊</div>
            <p>No recent transactions</p>
            <span>Your transaction history will appear here</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
