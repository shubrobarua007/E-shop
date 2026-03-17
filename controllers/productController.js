const productModel = require("../models/product.model");

async function getAllProducts(req, res) {
  try {
    const products = await productModel.find();
    if (products.length === 0) {
      return res.status(404).json({
        message: "No products available",
      });
    }
    return res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
async function getProductById(req, res) {
  const productId = req.params.id;
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
async function createProduct(req, res) {
  const { name, description, price, category, stock, image } = req.body;
  if (!name || !price || !category || !stock) {
    return res
      .status(400)
      .json({ message: "Name,Price,Category and Stock is required" });
  }
  try {
    const product = await productModel.create({
      name,
      description,
      price,
      category,
      stock,
      image,
    });
    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = { getAllProducts, getProductById, createProduct };
