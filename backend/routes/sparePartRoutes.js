const express = require("express");
const db = require("../config/db");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.use(verifyToken);

router.post("/", (req, res) => {
  const { name, category, quantity, unitPrice, totalPrice } = req.body;
  const sql =
    "INSERT INTO Spare_Part (Name, Category, Quantity, UnitPrice, TotalPrice) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, category, quantity, unitPrice, totalPrice], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Spare part added" });
  });
    
});


router.get("/", (req, res) => {
  const sql = "SELECT SparePartID, Name FROM Spare_Part";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});
  

module.exports = router;
