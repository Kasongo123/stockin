const express = require("express");
const db = require("../config/db");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.use(verifyToken);

router.post("/", (req, res) => {
  const {
    sparePartID,
    stockOutQuantity,
    stockOutUnitPrice,
    stockOutTotalPrice,
    stockOutDate,
  } = req.body;
  const sql = `INSERT INTO Stock_Out (SparePartID, StockOutQuantity, StockOutUnitPrice, StockOutTotalPrice, StockOutDate)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [
      sparePartID,
      stockOutQuantity,
      stockOutUnitPrice,
      stockOutTotalPrice,
      stockOutDate,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Stock out recorded" });
    }
  );
});

router.get("/", (req, res) => {
  const sql = `SELECT s.StockOutID, p.Name AS SparePartName, s.StockOutQuantity, s.StockOutUnitPrice, s.StockOutTotalPrice, s.StockOutDate
               FROM Stock_Out s JOIN Spare_Part p ON s.SparePartID = p.SparePartID`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.put("/:id", (req, res) => {
  const {
    stockOutQuantity,
    stockOutUnitPrice,
    stockOutTotalPrice,
    stockOutDate,
  } = req.body;
  const sql = `UPDATE Stock_Out SET StockOutQuantity=?, StockOutUnitPrice=?, StockOutTotalPrice=?, StockOutDate=? WHERE StockOutID=?`;
  db.query(
    sql,
    [
      stockOutQuantity,
      stockOutUnitPrice,
      stockOutTotalPrice,
      stockOutDate,
      req.params.id,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Stock out updated" });
    }
  );
});

router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM Stock_Out WHERE StockOutID = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Stock out deleted" });
  });
});

module.exports = router;
