import { Op } from "sequelize";
import db from "../models/index.js";

const demoUserIds = [
  "11111111-1111-4111-8111-111111111111",
  "22222222-2222-4222-8222-222222222222",
  "33333333-3333-4333-8333-333333333333",
];

const demoCartIds = [
  "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
  "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
];

const demoProductIds = Array.from(
  { length: 30 },
  (_, index) => `00000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
);

async function unseedDatabase() {
  try {
    await db.sequelize.authenticate();

    await db.CartItem.destroy({
      where: {
        cartId: {
          [Op.in]: demoCartIds,
        },
      },
    });
    await db.Cart.destroy({
      where: {
        cartId: {
          [Op.in]: demoCartIds,
        },
      },
    });
    await db.Product.destroy({
      where: {
        productId: {
          [Op.in]: demoProductIds,
        },
      },
    });
    await db.User.destroy({
      where: {
        userId: {
          [Op.in]: demoUserIds,
        },
      },
    });

    console.log("Demo seed data removed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Unable to remove demo seed data:", error);
    process.exit(1);
  }
}

unseedDatabase();
