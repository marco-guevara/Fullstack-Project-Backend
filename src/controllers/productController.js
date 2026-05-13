import db from "../models/index.js";

export async function getProducts(req, res) {
  try {
    const products = await db.Product.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to get products.",
      error: error.message,
    });
  }
}

export async function getProductById(req, res) {
  try {
    const { productId } = req.params;
    const product = await db.Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to get product.",
      error: error.message,
    });
  }
}
