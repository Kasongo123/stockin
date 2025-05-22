const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const sparepartRoutes = require("./routes/sparePartRoutes");
const stockInRoutes = require("./routes/stockInRoutes");
const stockOutRoutes = require("./routes/stockoutRoutes");
const reportRoutes = require('./routes/reportRoutes')

const app = express();
app.use(cors());
app.use(express.json());

// Route declarations
app.use("/api/auth", authRoutes);
app.use("/api/spareparts", sparepartRoutes);
app.use("/api/stockin", stockInRoutes);
app.use("/api/stockout", stockOutRoutes);
app.use('/api/report',reportRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
