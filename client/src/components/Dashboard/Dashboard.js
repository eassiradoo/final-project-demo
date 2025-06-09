import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BalanceOverview from './BalanceOverview';
import RecentTransactions from './RecentTransactions';
import MonthlyTrends from './MonthlyTrends';
import DateFilter from './DateFilter';
import './Dashboard.css';

const API_BASE_URL = 'http://localhost:5000/api';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactionsDateRange, setTransactionsDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date()
  });
  const [trendsDateRange, setTrendsDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date()
  });
  const [amount, setAmount] = useState('');
  const [history, setHistory] = useState([]);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching transactions from server...');
        
        // For demo purposes, we'll use John Doe's checking account (ID: 1)
        const response = await axios.get(`${API_BASE_URL}/accounts/1/transactions`);
        console.log('Server response:', response.data);
        
        const fetchedTransactions = response.data;
        
        // Calculate total balance
        const totalBalance = fetchedTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        
        setBalance(totalBalance);
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to connect to server. Please make sure the server is running.');
        // Fallback to mock data if server is not available
        const mockTransactions = [
          { id: 1, description: 'Salary Deposit', amount: 5000, date: '2024-03-01' },
          { id: 2, description: 'Rent Payment', amount: -1500, date: '2024-03-02' },
          { id: 3, description: 'Grocery Shopping', amount: -200, date: '2024-03-03' },
          { id: 4, description: 'Freelance Work', amount: 800, date: '2024-03-04' },
          { id: 5, description: 'Utility Bill', amount: -150, date: '2024-03-05' }
        ];
        const totalBalance = mockTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        setBalance(totalBalance);
        setTransactions(mockTransactions);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || amount.trim() === "") {
      setInputError("Please enter a valid number to deposit.");
      return;
    }
    setInputError("");
    setBalance(prevBalance => prevBalance + depositAmount);
    const newTransaction = {
      id: transactions.length + 1,
      description: 'Manual Deposit',
      amount: depositAmount,
      date: new Date().toISOString().slice(0, 10),
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setHistory(prevHistory => [
      ...prevHistory,
      { date: new Date().toLocaleString(), type: 'Deposit', amount: depositAmount }
    ]);
    setAmount('');
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || amount.trim() === "") {
      setInputError("Please enter a valid number to withdraw.");
      return;
    }
    if (withdrawAmount > balance) {
      setInputError("Insufficient funds for this withdrawal.");
      return;
    }
    setInputError("");
    setBalance(prevBalance => prevBalance - withdrawAmount);

    // Add to transactions
    const newTransaction = {
      id: transactions.length + 1,
      description: 'Manual Withdraw',
      amount: -withdrawAmount,
      date: new Date().toISOString().slice(0, 10),
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setHistory(prevHistory => [
      ...prevHistory,
      { date: new Date().toLocaleString(), type: 'Withdraw', amount: withdrawAmount }
    ]);
    setAmount('');
  };

  
  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-message">{error}</div>
        <h1>Banking Dashboard (Using Mock Data)</h1>
        <div className="dashboard-grid">
          <div className="balance-container">
            <BalanceOverview balance={balance} />
          </div>
          <div className="dashboard-main">
            <div className="dashboard-left">
              <div className="section-header">
                <DateFilter 
                  dateRange={transactionsDateRange} 
                  onDateRangeChange={setTransactionsDateRange} 
                />
              </div>
              <RecentTransactions 
                transactions={transactions} 
                dateRange={transactionsDateRange}
              />
            </div>
            <div className="dashboard-right">
              <div className="section-header">
                <DateFilter 
                  dateRange={trendsDateRange} 
                  onDateRangeChange={setTrendsDateRange} 
                />
              </div>
              <MonthlyTrends 
                transactions={transactions}
                dateRange={trendsDateRange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Banking Dashboard</h1>
      <div className="dashboard-grid">
        <div className="balance-container">
          <BalanceOverview balance={balance} />
          {/* Move input and buttons here */}
          <div
            style={{
              marginLeft: "2.5rem",
              marginTop: "2.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount"
              style={{
                padding: "0.7rem 1rem",
                borderRadius: 8,
                border: "1px solid #bbb",
                fontSize: "1rem",
                marginBottom: "1rem",
                width: "80%",
                maxWidth: 220,
              }}
            />
            <div className="button-group">
              <button className="deposit" onClick={handleDeposit}>Deposit</button>
              <button className="withdraw" onClick={handleWithdraw}>Withdraw</button>
            </div>
            {inputError && (
              <div
                style={{
                  color: "#c0392b",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                  marginTop: "1rem"
                }}
              >
                {inputError}
              </div>
            )}
          </div>
        </div>
        <div className="dashboard-main">
          <div className="dashboard-left">
            <div className="section-header">
              <DateFilter 
                dateRange={transactionsDateRange} 
                onDateRangeChange={setTransactionsDateRange} 
              />
            </div>
            <RecentTransactions 
              transactions={transactions} 
              dateRange={transactionsDateRange}
            />
          </div>
          <div className="dashboard-right">
            <div className="section-header">
              <DateFilter 
                dateRange={trendsDateRange} 
                onDateRangeChange={setTrendsDateRange} 
              />
            </div>
            <MonthlyTrends 
              transactions={transactions}
              dateRange={trendsDateRange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;