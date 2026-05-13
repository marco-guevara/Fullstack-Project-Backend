import db from "../models/index.js";

function createOrderReference() {
  const datePart = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();

  return `BALDO-${datePart}-${randomPart}`;
}

async function checkout(req, res) {
  try {
    const cart = await db.Cart.findOne({
      where: {
        userId: req.user.userId,
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
    });

    if (!cart) {
      return res.status(404).json({
        message: "Active cart not found.",
      });
    }

    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty.",
      });
    }

    cart.status = "completed";
    await cart.save();

    return res.status(200).json({
      message: "Checkout completed successfully.",
      orderReference: createOrderReference(),
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to complete checkout.",
      error: error.message,
    });
  }
}

export {
  checkout,
};
