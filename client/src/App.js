import React, { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      try {
        const response = await fetch("http://localhost:3001/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginForm.email,
            password: loginForm.password,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setIsLoggedIn(true);
          setLoginError("");
          // Optionally store user data for later use
          localStorage.setItem("user", JSON.stringify(data.data));
        } else {
          setLoginError(data.message || "Login failed");
        }
      } catch (error) {
        setLoginError("Connection error. Please try again.");
      }
    } else {
      setLoginError("Please enter both email and password.");
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
              boxShadow: "0 4px 24px rgba(44, 62, 80, 0.13)",
            }}
            className="login-container"
            onSubmit={handleLogin}
          >
            <input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
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
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
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
              <div style={{ color: "#c0392b", fontWeight: 500 }}>
                {loginError}
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  // Main simulator
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
