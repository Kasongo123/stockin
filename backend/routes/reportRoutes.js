const express = require("express");
const db = require("../config/db");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.use(verifyToken);

// Daily stock status: Remaining quantity per spare part
router.get("/daily-stock-status", (req, res) => {
  const sql = `
    SELECT 
      sp.SparePartID,
      sp.Name,
      sp.Category,
      IFNULL(SUM(si.StockInQuantity), 0) AS TotalIn,
      IFNULL(SUM(so.StockOutQuantity), 0) AS TotalOut,
      (IFNULL(SUM(si.StockInQuantity), 0) - IFNULL(SUM(so.StockOutQuantity), 0)) AS RemainingStock
    FROM Spare_Part sp
    LEFT JOIN Stock_In si ON sp.SparePartID = si.SparePartID
    LEFT JOIN Stock_Out so ON sp.SparePartID = so.SparePartID
    GROUP BY sp.SparePartID
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
