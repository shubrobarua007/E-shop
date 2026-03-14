const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userRegisterController(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "name,email and password is required to register",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already registerd",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name: name,
      email: email,
      password: hash,
    });
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
async function userLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password is required",
    });
  }
  try {

  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = { userRegisterController, userLogin };
