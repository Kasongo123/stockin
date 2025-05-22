const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const router = express.Router();
require("dotenv").config();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (Username, Password) VALUES (?, ?)";
    db.query(sql, [username, hashed], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "User registered" });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE Username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = results[0];
    const valid = await bcrypt.compare(password, user.Password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.UserID, username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.json({ message: "Login successful", token });
  });
});

module.exports = router;
