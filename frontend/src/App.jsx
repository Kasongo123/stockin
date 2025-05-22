import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SparePart from "./pages/SparePart";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";
import Reports from "./pages/Report";
import Navbar from "./components/Navbar";

function App() {
  // Initialize state with token from localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Optional: sync token state if localStorage changes outside React (rare)
  useEffect(() => {
    function onStorageChange() {
      setToken(localStorage.getItem("token"));
    }
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {token && <Navbar setToken={setToken} />}
        <Routes>
          {!token ? (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="*" element={<Navigate to="/register" replace />} />
            </>
          ) : (
            <>
              <Route path="/spareparts" element={<SparePart />} />
              <Route path="/stockin" element={<StockIn />} />
              <Route path="/stockout" element={<StockOut />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<Navigate to="/spareparts" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
