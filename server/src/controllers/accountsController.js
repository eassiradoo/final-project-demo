const Account = require("../models/accountModel");

// Get all accounts
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get account by ID
exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new account
exports.createAccount = async (req, res) => {
  const account = new Account(req.body);
  try {
    const newAccount = await account.save();
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update account
exports.updateAccount = async (req, res) => {
  try {
    const updatedAccount = await Account.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAccount)
      return res.status(404).json({ message: "Account not found" });
    res.json(updatedAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Withdraw from account
exports.withdrawFromAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });

    const amount = req.body.amount;
    if (amount <= 0 || amount > account.balance) {
      return res.status(400).json({ message: "Invalid withdrawal amount" });
    }

    account.balance -= amount;
    const updatedAccount = await account.save();
    res.json(updatedAccount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Deposit to account
exports.depositToAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });

    const amount = req.body.amount;
    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid deposit amount" });
    }

    account.balance += amount;
    const updatedAccount = await account.save();
    res.json(updatedAccount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete account
exports.deleteAccount = async (req, res) => {
  try {
    const deletedAccount = await Account.findByIdAndDelete(req.params.id);
    if (!deletedAccount)
      return res.status(404).json({ message: "Account not found" });
    res.json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
