// src/pages/SparePart.jsx
import React, { useState } from "react";
import axios from "axios";

const SparePart = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    unitPrice: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalPrice = form.quantity * form.unitPrice;

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/spareparts",
        {
          name: form.name,
          category: form.category,
          quantity: form.quantity,
          unitPrice: form.unitPrice,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Spare part added successfully!");
      setForm({ name: "", category: "", quantity: "", unitPrice: "" });
    } catch (error) {
      console.error(error);
      setMessage("Error adding spare part.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Spare Part</h2>

      {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Spare Part Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="unitPrice"
          value={form.unitPrice}
          onChange={handleChange}
          placeholder="Unit Price"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Spare Part
        </button>
      </form>
    </div>
  );
};

export default SparePart;
