const TransactionService = require("../services/transactionService");

class TransactionController {
  // GET /api/transactions - Get all transactions (admin)
  static async getAllTransactions(req, res) {
    try {
      const transactions = TransactionService.getAllTransactions();

      res.json({
        success: true,
        data: transactions,
        message: "Transactions retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve transactions",
      });
    }
  }

  // GET /api/transactions/:id - Get transaction by ID
  static async getTransactionById(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: "Valid transaction ID is required",
        });
      }

      const transaction = TransactionService.getTransactionById(parseInt(id));

      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: "Transaction not found",
        });
      }

      res.json({
        success: true,
        data: transaction,
        message: "Transaction retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve transaction",
      });
    }
  }

  // GET /api/transactions/account/:accountId - Get transactions by account ID
  static async getTransactionsByAccountId(req, res) {
    try {
      const { accountId } = req.params;
      const limit = parseInt(req.query.limit) || 50;

      if (!accountId || isNaN(parseInt(accountId))) {
        return res.status(400).json({
          success: false,
          message: "Valid account ID is required",
        });
      }

      const transactions = TransactionService.getTransactionsByAccountId(
        parseInt(accountId),
        limit
      );

      res.json({
        success: true,
        data: transactions,
        message: "Account transactions retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve account transactions",
      });
    }
  }

  // GET /api/transactions/user/:userId - Get transactions by user ID
  static async getTransactionsByUserId(req, res) {
    try {
      const { userId } = req.params;
      const limit = parseInt(req.query.limit) || 50;

      if (!userId || isNaN(parseInt(userId))) {
        return res.status(400).json({
          success: false,
          message: "Valid user ID is required",
        });
      }

      const transactions = TransactionService.getTransactionsByUserId(
        parseInt(userId),
        limit
      );

      res.json({
        success: true,
        data: transactions,
        message: "User transactions retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve user transactions",
      });
    }
  }

  // POST /api/transactions - Create a new transaction (for direct transaction creation)
  static async createTransaction(req, res) {
    try {
      const transactionData = req.body;

      const validation =
        TransactionService.validateTransactionData(transactionData);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        });
      }

      const newTransaction =
        TransactionService.createTransaction(transactionData);

      res.status(201).json({
        success: true,
        data: newTransaction,
        message: "Transaction created successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create transaction",
      });
    }
  }
}

module.exports = TransactionController;
