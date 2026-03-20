const express = require("express");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/placeOrder", authMiddleware, orderController.placeOrder);
router.get("/myOrder", authMiddleware, orderController.getMyOrder);
router.get(
  "/allOrders",
  authMiddleware,
  adminMiddleware,
  orderController.getAllOrders
);

module.exports = router;
