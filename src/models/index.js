import User from "./User.js";
import Cart from "./Cart.js";
import Product from "./Product.js";
import CartItem from "./CartItem.js";
import sequelize from "../config/database.js";

User.hasMany(Cart, { foreignKey: "userId", as: "carts", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "userId", as: "user" });

Cart.hasMany(CartItem, { foreignKey: "cartId", as: "items", onDelete: "CASCADE" });
CartItem.belongsTo(Cart, { foreignKey: "cartId", as: "cart" });

Product.hasMany(CartItem, { foreignKey: "productId", as: "cartItems", onDelete: "CASCADE" });
CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

const db = {
  sequelize,
  User,
  Cart,
  Product,
  CartItem,
};

export default db;
