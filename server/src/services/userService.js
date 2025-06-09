const db = require("../config/database");

class UserService {
  static getUserById(id) {
    const sql =
      "SELECT id, firstName, lastName, email, phone, dateOfBirth, address, createdAt, updatedAt FROM users WHERE id = ?";
    return db.get(sql, [id]);
  }

  static createUser(userData) {
    const { firstName, lastName, email, phone, dateOfBirth, address } =
      userData;

    const sql = `
      INSERT INTO users (firstName, lastName, email, phone, dateOfBirth, address)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = db.run(sql, [
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      address,
    ]);

    // doesn't return internal id
    return this.getUserById(result.lastInsertRowid);
  }

  static updateUser(id, updateData) {
    const { firstName, lastName, email, phone, dateOfBirth, address } =
      updateData;

    const sql = `
      UPDATE users 
      SET firstName = ?, lastName = ?, email = ?, phone = ?, 
          dateOfBirth = ?, address = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const result = db.run(sql, [
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      address,
      id,
    ]);

    if (result.changes === 0) {
      return null; // maybe change this
    }

    return this.getUserById(id);
  }

  static deleteUser(id) {
    const sql = "DELETE FROM users WHERE id = ?";
    const result = db.run(sql, [id]);

    return result.changes > 0;
  }

  static getUserByEmail(email) {
    const sql = "SELECT id, email FROM users WHERE email = ?";
    return db.get(sql, [email]);
  }

  static validateUserData(userData) {
    const errors = [];

    if (
      !userData.firstName ||
      typeof userData.firstName !== "string" ||
      userData.firstName.trim().length < 2
    ) {
      errors.push("First name must be at least 2 characters long");
    }

    if (
      !userData.lastName ||
      typeof userData.lastName !== "string" ||
      userData.lastName.trim().length < 2
    ) {
      errors.push("Last name must be at least 2 characters long");
    }

    if (!userData.email || !this.isValidEmail(userData.email)) {
      errors.push("Valid email is required");
    }

    if (!userData.phone || !this.isValidPhone(userData.phone)) {
      errors.push("Valid phone number is required");
    }

    if (userData.dateOfBirth && !this.isValidDate(userData.dateOfBirth)) {
      errors.push("Date of birth must be in YYYY-MM-DD format");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Email validation
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone validation (simple - at least 10 digits)
  static isValidPhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  // Date validation (YYYY-MM-DD format)
  static isValidDate(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;

    const date = new Date(dateString);
    return (
      date instanceof Date &&
      !isNaN(date) &&
      date.toISOString().slice(0, 10) === dateString
    );
  }
}

module.exports = UserService;
