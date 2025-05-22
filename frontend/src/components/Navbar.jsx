import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); // Update app state to reflect logout
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-teal-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <Link
            to="/spareparts"
            className="hover:underline hover:text-teal-300"
          >
            SparePart
          </Link>
          <Link to="/stockin" className="hover:underline hover:text-teal-300">
            StockIn
          </Link>
          <Link to="/stockout" className="hover:underline hover:text-teal-300">
            StockOut
          </Link>
          <Link to="/reports" className="hover:underline hover:text-teal-300">
            Reports
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
