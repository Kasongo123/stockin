// src/pages/StockIn.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const StockIn = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [form, setForm] = useState({
    sparePartID: "",
    stockInQuantity: "",
    stockInDate: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/spareparts/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSpareParts(res.data);
      } catch (error) {
        console.error("Failed to load spare parts:", error);
      }
    };

    fetchSpareParts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/stockin", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Stock-in recorded successfully!");
      setForm({ sparePartID: "", stockInQuantity: "", stockInDate: "" });
    } catch (err) {
      console.error(err);
      setMessage("Failed to record stock-in.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Stock In</h2>

      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="sparePartID"
          value={form.sparePartID}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
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
          name="stockInQuantity"
          value={form.stockInQuantity}
          onChange={handleChange}
          placeholder="Stock In Quantity"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="date"
          name="stockInDate"
          value={form.stockInDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Stock In
        </button>
      </form>
    </div>
  );
};

export default StockIn;
