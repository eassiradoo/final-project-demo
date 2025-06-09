const Database = require("better-sqlite3");

const db = new Database(":memory:");

db.pragma("foreign_keys = ON");

const createTables = () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT NOT NULL,
      dateOfBirth TEXT,
      address TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createAccountsTable = `
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      accountNumber INTEGER UNIQUE NOT NULL,
      accountType TEXT NOT NULL CHECK (accountType IN ('checking', 'savings')),
      balance DECIMAL(10,2) DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `;

  const createTransactionsTable = `
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      accountId INTEGER NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal')),
      amount DECIMAL(10,2) NOT NULL,
      description TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (accountId) REFERENCES accounts(id) ON DELETE CASCADE
    )
  `;

  db.exec(createUsersTable);
  db.exec(createAccountsTable);
  db.exec(createTransactionsTable);
};

const seedData = () => {
  const insertUser = db.prepare(`
    INSERT INTO users (firstName, lastName, email, password, phone)
    VALUES (?, ?, ?, ?, ?)
  `);

  const insertAccount = db.prepare(`
    INSERT INTO accounts (userId, accountNumber, accountType, balance)
    VALUES (?, ?, ?, ?)
  `);

  const insertTransaction = db.prepare(`
    INSERT INTO transactions (accountId, type, amount, description)
    VALUES (?, ?, ?, ?)
  `);

  // where we add more seed data :)

  const user1 = insertUser.run(
    "John",
    "Doe",
    "john.doe@example.com",
    "password123",
    "+1234567890"
  );
  const user2 = insertUser.run(
    "Jane",
    "Smith",
    "jane.smith@example.com",
    "password456",
    "+1234567891"
  );

  const account1 = insertAccount.run(
    user1.lastInsertRowid,
    1000000,
    "checking",
    1000
  );
  const account2 = insertAccount.run(
    user1.lastInsertRowid,
    1000001,
    "savings",
    5000
  );
  const account3 = insertAccount.run(
    user2.lastInsertRowid,
    1000002,
    "checking",
    2500
  );

  // Add sample transactions
  insertTransaction.run(
    account1.lastInsertRowid,
    "deposit",
    2500.0,
    "Direct Deposit - Salary"
  );
  insertTransaction.run(
    account1.lastInsertRowid,
    "withdrawal",
    150.0,
    "ATM Withdrawal"
  );
  insertTransaction.run(account2.lastInsertRowid, "deposit", 1000.0, "Deposit");
  insertTransaction.run(
    account2.lastInsertRowid,
    "deposit",
    4000.0,
    "Initial Deposit"
  );
  insertTransaction.run(
    account3.lastInsertRowid,
    "deposit",
    2500.0,
    "Opening Deposit"
  );
};

createTables();
seedData();

const dbHelpers = {
  // runs a query that doesn't return data (INSERT, UPDATE, DELETE)
  run: (sql, params = []) => {
    try {
      const stmt = db.prepare(sql);
      return stmt.run(params);
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  },

  // getting a single row
  get: (sql, params = []) => {
    try {
      const stmt = db.prepare(sql);
      return stmt.get(params);
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  },

  // get more than one row
  all: (sql, params = []) => {
    try {
      const stmt = db.prepare(sql);
      return stmt.all(params);
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  },

  // execute raw SQL (for CREATE, DROP, etc.)
  exec: (sql) => {
    try {
      return db.exec(sql);
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  },

  getInstance: () => db,
};

module.exports = dbHelpers;
