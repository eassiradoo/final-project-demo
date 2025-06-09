const { json } = require("express");
const dbHelpers = require("../config/database");

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await dbHelpers.all("SELECT * FROM accounts");
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllAccountsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const accounts = await dbHelpers.all(
      "SELECT * FROM accounts WHERE userId = ?",
      [userId]
    );
    if (accounts.length === 0) {
      return res
        .status(404)
        .json({ message: "No accounts found for this user" });
    }
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAccountById = async (req, res) => {
  // Could possibly change to a req.body
  const { id } = req.params;

  try {
    const account = await dbHelpers.get("SELECT * FROM accounts WHERE id = ?", [
      id,
    ]);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const withdrawFromAccount = async (req, res) => {
  const { accountId, amount } = req.body;

  try {
    // Check if account exists
    const account = await dbHelpers.get("SELECT * FROM accounts WHERE id = ?", [
      accountId,
    ]);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Check if sufficient balance
    if (account.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Update the account balance
    await dbHelpers.run(
      "UPDATE accounts SET balance = balance - ? WHERE id = ?",
      [amount, accountId]
    );

    res.json({
      message: "Withdrawal successful",
      newBalance: account.balance - amount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const depositToAccount = async (req, res) => {
  const { accountId, amount } = req.body;

  try {
    // Check if account exists
    const account = await dbHelpers.get("SELECT * FROM accounts WHERE id = ?", [
      accountId,
    ]);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Update the account balance
    await dbHelpers.run(
      "UPDATE accounts SET balance = balance + ? WHERE id = ?",
      [amount, accountId]
    );

    res.json({
      message: "Deposit successful",
      newBalance: account.balance + amount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if account exists
    const account = await dbHelpers.get("SELECT * FROM accounts WHERE id = ?", [
      id,
    ]);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Delete the account
    await dbHelpers.run("DELETE FROM accounts WHERE id = ?", [id]);

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const registerAccount = async (req, res) => {
  const { userId, accountNumber, accountType, balance } = req.body;

  try {
    const user = await dbHelpers.get("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.accounts.length === 2) {
      return res
        .status(404)
        .json({ message: "Maximum Number of Accounts Reached" });
    } else if (user.accounts.length === 1) {
      const account = user.accounts[0];

      if (account.accountType === accountType) {
        return res
          .status(404)
          .json({ message: `${accountType} account already exists` });
      }
    }

    const result = await dbHelpers.run(
      "INSERT INTO accounts (userId, accountNumber, accountType, balance) VALUES (?, ?, ?, ?)",
      [userId, accountNumber, accountType, balance]
    );

    res.status(201).json({
      message: "Account created successfully",
      accountId: result.lastInsertRowid,
    });
  } catch {
    return res.status(404).json({ message: "Error making account" });
  }
};

const getAccountTransactions = async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching transactions for account ID: ${id}`);

  try {
    const transactions = await dbHelpers.all(
      "SELECT * FROM transactions WHERE accountId = ? ORDER BY date DESC",
      [id]
    );
    
    console.log(`Found ${transactions.length} transactions for account ${id}`);
    
    if (transactions.length === 0) {
      console.log(`No transactions found for account ${id}`);
      return res.json([]);
    }
    
    res.json(transactions);
  } catch (err) {
    console.error(`Error fetching transactions for account ${id}:`, err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllAccounts,
  withdrawFromAccount,
  depositToAccount,
  getAccountById,
  getAllAccountsByUserId,
  deleteAccount,
  registerAccount,
  getAccountTransactions
};
