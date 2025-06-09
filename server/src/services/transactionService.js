const db = require("../config/database");

class TransactionService {
  static createTransaction(transactionData) {
    const { accountId, type, amount, description } = transactionData;

    const sql = `
      INSERT INTO transactions (accountId, type, amount, description)
      VALUES (?, ?, ?, ?)
    `;

    const result = db.run(sql, [accountId, type, amount, description]);
    return this.getTransactionById(result.lastInsertRowid);
  }

  static getTransactionById(id) {
    const sql = `
      SELECT t.*, a.accountNumber, a.accountType, u.firstName, u.lastName
      FROM transactions t
      JOIN accounts a ON t.accountId = a.id
      JOIN users u ON a.userId = u.id
      WHERE t.id = ?
    `;
    return db.get(sql, [id]);
  }

  static getTransactionsByAccountId(accountId, limit = 50) {
    const sql = `
      SELECT t.*, a.accountNumber, a.accountType
      FROM transactions t
      JOIN accounts a ON t.accountId = a.id
      WHERE t.accountId = ?
      ORDER BY t.createdAt DESC
      LIMIT ?
    `;
    return db.all(sql, [accountId, limit]);
  }

  static getTransactionsByUserId(userId, limit = 50) {
    const sql = `
      SELECT t.*, a.accountNumber, a.accountType
      FROM transactions t
      JOIN accounts a ON t.accountId = a.id
      WHERE a.userId = ?
      ORDER BY t.createdAt DESC
      LIMIT ?
    `;
    return db.all(sql, [userId, limit]);
  }

  static getAllTransactions() {
    const sql = `
      SELECT t.*, a.accountNumber, a.accountType, u.firstName, u.lastName
      FROM transactions t
      JOIN accounts a ON t.accountId = a.id
      JOIN users u ON a.userId = u.id
      ORDER BY t.createdAt DESC
    `;
    return db.all(sql);
  }

  static validateTransactionData(transactionData) {
    const errors = [];

    if (
      !transactionData.accountId ||
      isNaN(parseInt(transactionData.accountId))
    ) {
      errors.push("Valid account ID is required");
    }

    if (
      !transactionData.type ||
      !["deposit", "withdrawal"].includes(transactionData.type)
    ) {
      errors.push("Transaction type must be 'deposit' or 'withdrawal'");
    }

    if (
      !transactionData.amount ||
      isNaN(parseFloat(transactionData.amount)) ||
      parseFloat(transactionData.amount) <= 0
    ) {
      errors.push("Amount must be a positive number");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

module.exports = TransactionService;
