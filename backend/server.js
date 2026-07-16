require("./config/db");

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Auth Routes
app.use("/api/auth", authRoutes);

// Product Routes
app.use("/api/products", productRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});