import React, { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import AccountCard from "./AccountCard";
import ActionButtons from "./ActionButtons";
import RecentTransactions from "./RecentTransactions";
import TransactionModal from "../Modals/TransactionModal";
import { accountsAPI, transactionsAPI } from "../../services/api";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState({ type: null, isOpen: false });

  // Fetch data when user is available
  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      // Fetch accounts and transactions in parallel
      const [accountsResponse, transactionsResponse] = await Promise.all([
        accountsAPI.getUserAccounts(user.id),
        transactionsAPI.getUserTransactions(user.id, 4),
      ]);

      setAccounts(accountsResponse.data || accountsResponse);
      setTransactions(transactionsResponse.data || transactionsResponse);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      window.showErrorToast("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async (transactionData) => {
    try {
      const response = await accountsAPI.deposit(
        transactionData.accountId,
        transactionData.amount,
        transactionData.description
      );

      // Show success message
      window.showSuccessToast(
        `Successfully deposited ${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(transactionData.amount)}`
      );

      // Refresh dashboard data for real-time updates
      await fetchDashboardData();
    } catch (error) {
      console.error("Deposit failed:", error);
      window.showErrorToast(error.message || "Deposit failed");
    }
  };

  const handleWithdraw = async (transactionData) => {
    try {
      const response = await accountsAPI.withdraw(
        transactionData.accountId,
        transactionData.amount,
        transactionData.description
      );

      // Show success message
      window.showSuccessToast(
        `Successfully withdrew ${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(transactionData.amount)}`
      );

      // Refresh dashboard data for real-time updates
      await fetchDashboardData();
    } catch (error) {
      console.error("Withdrawal failed:", error);
      window.showErrorToast(error.message || "Withdrawal failed");
    }
  };

  const openModal = (type) => {
    setModalState({ type, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ type: null, isOpen: false });
  };

  // Find specific account types
  const checkingAccount = accounts.find(
    (acc) => acc.accountType === "checking"
  );
  const savingsAccount = accounts.find((acc) => acc.accountType === "savings");

  if (!user) {
    return (
      <div className="dashboard dashboard--loading">
        <div className="dashboard__loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <DashboardHeader user={user} />

      <div className="dashboard__accounts">
        <AccountCard account={checkingAccount} type="checking" />
        <AccountCard account={savingsAccount} type="savings" />
      </div>

      <ActionButtons
        onDeposit={() => openModal("deposit")}
        onWithdraw={() => openModal("withdraw")}
      />

      <RecentTransactions transactions={transactions} loading={loading} />

      <TransactionModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSubmit={
          modalState.type === "deposit" ? handleDeposit : handleWithdraw
        }
        type={modalState.type}
        accounts={accounts}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
