import db from "../models/index.js";

function parseQuantity(quantity) {
  const parsedQuantity = Number(quantity);

  if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
    return null;
  }

  return parsedQuantity;
}

async function findActiveCart(userId) {
  return db.Cart.findOne({
    where: {
      userId,
      status: "active",
    },
    include: [
      {
        model: db.CartItem,
        as: "items",
        include: [
          {
            model: db.Product,
            as: "product",
          },
        ],
      },
    ],
    order: [[{ model: db.CartItem, as: "items" }, "createdAt", "ASC"]],
  });
}

async function findOrCreateActiveCart(userId) {
  const [cart] = await db.Cart.findOrCreate({
    where: {
      userId,
      status: "active",
    },
    defaults: {
      userId,
      status: "active",
    },
  });

  return cart;
}

async function findOwnedCartItem(userId, cartItemId) {
  return db.CartItem.findOne({
    where: {
      cartItemId,
    },
    include: [
      {
        model: db.Cart,
        as: "cart",
        where: {
          userId,
          status: "active",
        },
      },
      {
        model: db.Product,
        as: "product",
      },
    ],
  });
}

async function getCart(req, res) {
  try {
    const cart = await findActiveCart(req.user.userId);

    return res.status(200).json({
      cart: cart || null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to get cart.",
      error: error.message,
    });
  }
}

async function addCartItem(req, res) {
  try {
    const { productId, quantity = 1, selectedSize, selectedColor } = req.body;
    const parsedQuantity = parseQuantity(quantity);

    if (!productId) {
      return res.status(400).json({
        message: "Product id is required.",
      });
    }

    if (!parsedQuantity) {
      return res.status(400).json({
        message: "Quantity must be a positive whole number.",
      });
    }

    const product = await db.Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    if (product.sizes.length > 0 && !product.sizes.includes(selectedSize)) {
      return res.status(400).json({
        message: "Selected size is not available for this product.",
      });
    }

    if (product.colors.length > 0 && !product.colors.includes(selectedColor)) {
      return res.status(400).json({
        message: "Selected color is not available for this product.",
      });
    }

    const cart = await findOrCreateActiveCart(req.user.userId);
    const existingCartItem = await db.CartItem.findOne({
      where: {
        cartId: cart.cartId,
        productId,
        selectedSize,
        selectedColor,
      },
    });

    if (existingCartItem) {
      existingCartItem.quantity += parsedQuantity;
      await existingCartItem.save();
    } else {
      await db.CartItem.create({
        cartId: cart.cartId,
        productId,
        quantity: parsedQuantity,
        selectedSize,
        selectedColor,
      });
    }

    const updatedCart = await findActiveCart(req.user.userId);

    return res.status(201).json({
      message: "Product added to cart.",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to add product to cart.",
      error: error.message,
    });
  }
}

async function updateCartItem(req, res) {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    const parsedQuantity = parseQuantity(quantity);

    if (!parsedQuantity) {
      return res.status(400).json({
        message: "Quantity must be a positive whole number.",
      });
    }

    const cartItem = await findOwnedCartItem(req.user.userId, cartItemId);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found.",
      });
    }

    cartItem.quantity = parsedQuantity;
    await cartItem.save();

    const updatedCart = await findActiveCart(req.user.userId);

    return res.status(200).json({
      message: "Cart item updated.",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to update cart item.",
      error: error.message,
    });
  }
}

async function deleteCartItem(req, res) {
  try {
    const { cartItemId } = req.params;
    const cartItem = await findOwnedCartItem(req.user.userId, cartItemId);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found.",
      });
    }

    await cartItem.destroy();

    const updatedCart = await findActiveCart(req.user.userId);

    return res.status(200).json({
      message: "Cart item removed.",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to remove cart item.",
      error: error.message,
    });
  }
}

export {
  addCartItem,
  deleteCartItem,
  getCart,
  updateCartItem,
};
