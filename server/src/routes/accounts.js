const express = require("express");

const router = express.Router();

// Example GET route for /accounts
router.get("/", (req, res) => {
  res.send("Accounts route is working");
});

module.exports = router;
