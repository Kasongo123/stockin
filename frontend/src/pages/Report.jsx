import { useState, useEffect } from "react";
import axios from "axios";

function Report() {
  const [stockOutReport, setStockOutReport] = useState([]);
  const [stockStatus, setStockStatus] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStockOutReport();
    fetchStockStatus();
  }, []);

  const fetchStockOutReport = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stockout", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStockOutReport(res.data);
    } catch (err) {
      console.error("Error fetching stock out report:", err);
    }
  };

  const fetchStockStatus = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/report/daily-stock-status",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStockStatus(res.data);
    } catch (err) {
      console.error("Error fetching stock status:", err);
    }
  };

  return (
    <div className="p-6 space-y-10">
      {/* Stock Out Report */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Daily Stock Out Report</h2>
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Spare Part</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Unit Price</th>
              <th className="p-2 text-left">Total Price</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {stockOutReport.map((item) => (
              <tr key={item.StockOutID}>
                <td className="p-2">{item.SparePartName}</td>
                <td className="p-2">{item.StockOutQuantity}</td>
                <td className="p-2">{item.StockOutUnitPrice}</td>
                <td className="p-2">{item.StockOutTotalPrice}</td>
                <td className="p-2">{item.StockOutDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stock Status Report */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Daily Stock Status Report
        </h2>
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Spare Part</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Stock In</th>
              <th className="p-2 text-left">Stock Out</th>
              <th className="p-2 text-left">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {stockStatus.map((item) => (
              <tr key={item.SparePartID}>
                <td className="p-2">{item.Name}</td>
                <td className="p-2">{item.Category}</td>
                <td className="p-2">{item.TotalIn}</td>
                <td className="p-2">{item.TotalOut}</td>
                <td className="p-2">{item.RemainingStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
