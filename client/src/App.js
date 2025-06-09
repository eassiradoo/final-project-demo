import React, { useState } from "react";
import logo from './logo.svg';
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username && loginForm.password) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Please enter both username and password.");
    }
  };

  const handleDeposit = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;
    setBalance(balance + num);
    setHistory([
      { type: "Deposit", amount: num, date: new Date().toLocaleString() },
      ...history,
    ]);
    setAmount("");
  };

  const handleWithdraw = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0 || num > balance) return;
    setBalance(balance - num);
    setHistory([
      { type: "Withdraw", amount: num, date: new Date().toLocaleString() },
      ...history,
    ]);
    setAmount("");
  };

  // Landing page
  if (!showSimulator) {
    return (
      <div className="App">
        <div className="landing">
          <h1>Welcome to Our Bank</h1>
          <button className="deposit" onClick={() => setShowSimulator(true)}>
            Enter
          </button>
        </div>
      </div>
    );
  }

  // Login page
  if (!isLoggedIn) {
    return (
      <div className="App">
        <div className="landing">
          <h1>Bank Login</h1>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              minWidth: 300,
              background: "#fff",
              padding: "2rem 2.5rem",
              borderRadius: 16,
              boxShadow: "0 4px 24px rgba(44, 62, 80, 0.13)"
            }}
          className="login-container"
            onSubmit={handleLogin}
          >
            <input
              type="text"
              placeholder="Username"
              value={loginForm.username}
              onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
              style={{
                padding: "0.7rem 1rem",
                borderRadius: 8,
                border: "1px solid #bbb",
                fontSize: "1rem",
                width: "100%",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
              style={{
                padding: "0.7rem 1rem",
                borderRadius: 8,
                border: "1px solid #bbb",
                fontSize: "1rem",
                width: "100%",
              }}
            />
            <button className="deposit" type="submit" style={{ width: "100%" }}>
              Login
            </button>
            {loginError && (
              <div style={{ color: "#c0392b", fontWeight: 500 }}>{loginError}</div>
            )}
          </form>
        </div>
      </div>
    );
  }

  // Main simulator
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Bank Account Simulator</h2>
        <h3>Balance: ${balance.toFixed(2)}</h3>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <div className="button-group">
          <button className="deposit" onClick={handleDeposit}>Deposit</button>
          <button className="withdraw" onClick={handleWithdraw}>Withdraw</button>
        </div>
        <h4>Transaction History</h4>
        <ul>
          {history.map((item, idx) => (
            <li key={idx}>
              [{item.date}] {item.type}: ${item.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
