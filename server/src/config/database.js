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
      description TEXT NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (accountId) REFERENCES accounts(id) ON DELETE CASCADE
    )
  `;

  db.exec(createUsersTable);
  db.exec(createAccountsTable);
  db.exec(createTransactionsTable);
};

const seedData = () => {
  const insertUser = db.prepare(`
    INSERT INTO users (firstName, lastName, email, phone)
    VALUES (?, ?, ?, ?)
  `);

  const insertAccount = db.prepare(`
    INSERT INTO accounts (userId, accountNumber, accountType, balance)
    VALUES (?, ?, ?, ?)
  `);

  const insertTransaction = db.prepare(`
    INSERT INTO transactions (accountId, description, amount, date)
    VALUES (?, ?, ?, ?)
  `);

  // Create single user
  const user1 = insertUser.run(
    "John",
    "Doe",
    "john.doe@example.com",
    "+1234567890"
  );

  // Create accounts for John
  const account1 = insertAccount.run(user1.lastInsertRowid, 1000000, "checking", 1000);
  const account2 = insertAccount.run(user1.lastInsertRowid, 1000001, "savings", 5000);

  // Add transactions for John's checking account
  insertTransaction.run(account1.lastInsertRowid, "Salary Deposit", 5000, "2024-03-01");
  insertTransaction.run(account1.lastInsertRowid, "Rent Payment", -1500, "2024-03-02");
  insertTransaction.run(account1.lastInsertRowid, "Grocery Shopping", -200, "2024-03-03");
  insertTransaction.run(account1.lastInsertRowid, "Freelance Work", 800, "2024-03-04");
  insertTransaction.run(account1.lastInsertRowid, "Utility Bill", -150, "2024-03-05");

  // Add a few transactions for John's savings account
  insertTransaction.run(account2.lastInsertRowid, "Initial Deposit", 5000, "2024-03-01");
  insertTransaction.run(account2.lastInsertRowid, "Interest Earned", 50, "2024-03-15");
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
