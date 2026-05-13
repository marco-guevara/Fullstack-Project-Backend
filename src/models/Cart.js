import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Cart = sequelize.define("Cart", {
  cartId: {
    type: DataTypes.UUID,
    field: "cart_id",
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    field: "user_id",
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM("active", "completed"),
    allowNull: false,
    defaultValue: "active",
  },
}, {
  tableName: "carts",
  underscored: true,
});

export default Cart;
