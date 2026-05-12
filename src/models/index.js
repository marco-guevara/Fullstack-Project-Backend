import User from "./User.js";
import Profile from "./Profile.js";
import Cart from "./Cart.js";
import Product from "./Product.js";
import CartItem from "./CartItem.js";
import sequelize from "../config/database.js";

User.hasOne(Profile, { foreignKey: "userId", as: "profile", onDelete: "CASCADE" });
Profile.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasOne(Cart, { foreignKey: "userId", as: "cart", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "userId", as: "user" });

Cart.hasMany(CartItem, { foreignKey: "cartId", as: "items", onDelete: "CASCADE" });
CartItem.belongsTo(Cart, { foreignKey: "cartId", as: "cart" });

Product.hasMany(CartItem, { foreignKey: "productId", as: "cartItems", onDelete: "CASCADE" });
CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

const db = {
  sequelize,
  User,
  Profile,
  Cart,
  Product,
  CartItem,
};

export default db;
