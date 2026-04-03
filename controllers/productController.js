const productModel = require("../models/product.model");

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
async function getAllProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await productModel.find().skip(skip).limit(limit);
    if (products.length === 0) {
      return res.status(404).json({
        message: "No products available",
      });
    }
    const totalProducts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);
    return res.status(200).json({
      message: "Products fetched successfully",
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
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
    // Invalid MongoDB ID format
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product ID format",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function updateProduct(req, res) {
  const productId = req.params.id;

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      req.body,
      { returnDocument: "after" }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product updated successfylly",
      updatedProduct,
    });
  } catch (error) {
    // Invalid MongoDB ID format
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product ID format",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
async function deleteProduct(req, res) {
  const productId = req.params.id;
  try {
    const deleteProduct = await productModel.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    // Invalid MongoDB ID format
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product ID format",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
