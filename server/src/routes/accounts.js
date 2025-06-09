const express = require("express");
const {
  getAllAccounts,
  withdrawFromAccount,
  depositToAccount,
  getAccountById,
  getAllAccountsByUserId,
  deleteAccount,
  registerAccount,
  getAccountTransactions
} = require("../controllers/accountsController");

const router = express.Router();

// All of these start with /accounts
router.get("/", getAllAccounts);
router.put("/withdraw", withdrawFromAccount);
router.put("/deposit", depositToAccount);
router.get("/:id", getAccountById); // Specifically Account id (not account number)
router.get("/user/:userId", getAllAccountsByUserId);
router.get("/:id/transactions", getAccountTransactions);
router.delete("/:id", deleteAccount); // Only deletes account such as checking or saving (NOT ENTIRE)
router.post("/register", registerAccount); // Register a new account

module.exports = router;
