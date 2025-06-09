import React, { useState, useEffect } from 'react';
import BalanceOverview from './BalanceOverview';
import RecentTransactions from './RecentTransactions';
import MonthlyTrends from './MonthlyTrends';
import DateFilter from './DateFilter';
import './Dashboard.css';

// Mock data
const mockTransactions = [
  { id: 1, description: 'Salary Deposit', amount: 5000, date: '2024-03-01' },
  { id: 2, description: 'Rent Payment', amount: -1500, date: '2024-03-02' },
  { id: 3, description: 'Grocery Shopping', amount: -200, date: '2024-03-03' },
  { id: 4, description: 'Freelance Work', amount: 800, date: '2024-03-04' },
  { id: 5, description: 'Utility Bill', amount: -150, date: '2024-03-05' },
  { id: 6, description: 'Online Shopping', amount: -300, date: '2024-03-06' },
  { id: 7, description: 'Client Payment', amount: 1200, date: '2024-03-07' },
  { id: 8, description: 'Restaurant', amount: -75, date: '2024-03-08' },
  { id: 9, description: 'Gym Membership', amount: -50, date: '2024-03-09' },
  { id: 10, description: 'Investment Return', amount: 300, date: '2024-03-10' },
];

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [transactionsDateRange, setTransactionsDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date()
  });
  const [trendsDateRange, setTrendsDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date()
  });

  // Use mock data instead of API calls
  useEffect(() => {
    // Calculate balance from transactions
    const totalBalance = mockTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    setBalance(totalBalance);
    setTransactions(mockTransactions);
  }, []);

  return (
    <div className="dashboard">
      <h1>Banking Dashboard</h1>
      
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
};

export default Dashboard; 