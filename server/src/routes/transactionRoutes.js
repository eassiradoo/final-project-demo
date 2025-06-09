const express = require("express");
const TransactionController = require("../controllers/transactionController");

const router = express.Router();

// GET /api/transactions - Get all transactions (admin)
router.get("/", TransactionController.getAllTransactions);

// GET /api/transactions/account/:accountId - Get transactions by account ID
router.get(
  "/account/:accountId",
  TransactionController.getTransactionsByAccountId
);

// GET /api/transactions/user/:userId - Get transactions by user ID
router.get("/user/:userId", TransactionController.getTransactionsByUserId);

// POST /api/transactions - Create new transaction
router.post("/", TransactionController.createTransaction);

// GET /api/transactions/:id - Get transaction by ID (must be last)
router.get("/:id", TransactionController.getTransactionById);

module.exports = router;
