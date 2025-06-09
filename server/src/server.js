const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Initialize database
const dbHelpers = require("./config/database");

const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
app.get("/test-db", (req, res) => {
  try {
    const result = dbHelpers.get("SELECT 1 as test");
    res.json({ success: true, message: "Database connected", result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Banking API" });
});

app.use("/api/accounts", require("./routes/accounts"));
// res.json({ message: "Welcome to the Banking API" })

// User routes
app.use("/api/users", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message
  });
});

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Database initialized with test data");
});
