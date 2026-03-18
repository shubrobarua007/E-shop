const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/product.route");
const app = express();
//Calling DataBase
connectDB();
//Middleware
app.use(express.json());
//Routes
app.use("/api/auth/", authRoutes);
app.use("/api/product/", productRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "App is running successfully",
  });
});

module.exports = app;
