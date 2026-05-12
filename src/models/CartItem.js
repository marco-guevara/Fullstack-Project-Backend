import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CartItem = sequelize.define("CartItem", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cartId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  selectedSize: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  selectedColor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "cart_items",
});

export default CartItem;
