const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");

async function placeOrder(req, res) {
  const { products } = req.body;
  if (!products || products.length === 0) {
    return res.status(404).json({
      message: "Cart is empty",
    });
  }
  try {
    const orderItems = await Promise.all(
      products.map(async (item) => {
        const product = await productModel.findById(item.productId);
        if (!product) {
          throw new Error(`Product not found:${item.productId}`);
        }
        return {
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
        };
      })
    );
    const totalPrice = orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    const order = await orderModel.create({
      user: req.user.id,
      products: orderItems,
      totalPrice,
    });
    return res.status(201).json({
      message: "Order placed successfully",
      user: req.user.id,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
async function getMyOrder(req, res) {
  const userId = req.user.id;
  try {
    const orders = await orderModel.find({ user: userId });
    if (orders.length === 0) {
      return res.status(404).json({
        message: "No orders found",
      });
    }
    return res.status(200).json({
      message: "Oreders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
async function getAllOrders(req, res) {
  try {
    const allOrders = await orderModel.find();
    if (allOrders.length === 0) {
      return res.status(404).json({
        message: "No orders found ",
      });
    }
    res.status(200).json({
      message: "All orders fetched successfully",
      allOrders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
module.exports = { placeOrder, getMyOrder, getAllOrders };
