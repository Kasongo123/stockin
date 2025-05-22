// src/pages/StockOut.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function StockOut() {
  const [stockOuts, setStockOuts] = useState([]);
  const [formData, setFormData] = useState({
    sparePartID: "",
    stockOutQuantity: "",
    stockOutUnitPrice: "",
    stockOutTotalPrice: "",
    stockOutDate: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [spareParts, setSpareParts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStockOuts();
    fetchSpareParts();
  }, []);

  const fetchStockOuts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stockout", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStockOuts(res.data);
    } catch (err) {
      console.error("Error fetching stock outs:", err);
    }
  };

  const fetchSpareParts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/report/daily-stock-status",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSpareParts(res.data);
    } catch (err) {
      console.error("Error fetching spare parts:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/stockout/${editingId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post("http://localhost:5000/api/stockout", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({
        sparePartID: "",
        stockOutQuantity: "",
        stockOutUnitPrice: "",
        stockOutTotalPrice: "",
        stockOutDate: "",
      });
      setEditingId(null);
      fetchStockOuts();
    } catch (err) {
      console.error("Error submitting stock out:", err);
    }
  };

  const handleEdit = (stockOut) => {
    setFormData({
      sparePartID: stockOut.SparePartID || "", // fallback for any missing fields
      stockOutQuantity: stockOut.StockOutQuantity,
      stockOutUnitPrice: stockOut.StockOutUnitPrice,
      stockOutTotalPrice: stockOut.StockOutTotalPrice,
      stockOutDate: stockOut.StockOutDate,
    });
    setEditingId(stockOut.StockOutID);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stockout/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStockOuts();
    } catch (err) {
      console.error("Error deleting stock out:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Stock Out</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="sparePartID"
          value={formData.sparePartID}
          onChange={handleChange}
          className="block w-full border p-2 rounded"
          required
        >
          <option value="">Select Spare Part</option>
          {spareParts.map((part) => (
            <option key={part.SparePartID} value={part.SparePartID}>
              {part.Name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="stockOutQuantity"
          value={formData.stockOutQuantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="block w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="stockOutUnitPrice"
          value={formData.stockOutUnitPrice}
          onChange={handleChange}
          placeholder="Unit Price"
          className="block w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="stockOutTotalPrice"
          value={formData.stockOutTotalPrice}
          onChange={handleChange}
          placeholder="Total Price"
          className="block w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="stockOutDate"
          value={formData.stockOutDate}
          onChange={handleChange}
          className="block w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Save"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Stock Out Records</h2>
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Spare Part</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Unit Price</th>
              <th className="p-2">Total Price</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockOuts.map((record) => (
              <tr key={record.StockOutID}>
                <td className="p-2">{record.SparePartName}</td>
                <td className="p-2">{record.StockOutQuantity}</td>
                <td className="p-2">{record.StockOutUnitPrice}</td>
                <td className="p-2">{record.StockOutTotalPrice}</td>
                <td className="p-2">{record.StockOutDate}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(record)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(record.StockOutID)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockOut;
