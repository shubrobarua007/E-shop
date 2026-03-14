const express = require("express");
const connectDB = require("./config/db");
const app = express();
app.use(express.json());

//Calling DataBase
connectDB();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "App is running successfully",
  });
});

module.exports = app;
