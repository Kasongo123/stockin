const express = require("express");
const db = require("../config/db");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.use(verifyToken);

router.post("/", (req, res) => {
  const { sparePartID, stockInQuantity, stockInDate } = req.body;
  const sql =
    "INSERT INTO Stock_In (SparePartID, StockInQuantity, StockInDate) VALUES (?, ?, ?)";
  db.query(sql, [sparePartID, stockInQuantity, stockInDate], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Stock in recorded" });
  });
});

module.exports = router;
