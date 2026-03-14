const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.userRegisterController);
router.post("/login", authController.userLogin);

module.exports = router;
