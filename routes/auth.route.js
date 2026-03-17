const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", authController.userRegisterController);
router.post("/login", authController.userLogin);
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Profile accessed",

    user: req.user,
  });
});

module.exports = router;
