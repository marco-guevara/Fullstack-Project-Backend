import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CartItem = sequelize.define("CartItem", {
  cartItemId: {
    type: DataTypes.UUID,
    field: "cart_item_id",
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cartId: {
    type: DataTypes.UUID,
    field: "cart_id",
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    field: "product_id",
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  selectedSize: {
    type: DataTypes.STRING,
    field: "selected_size",
    allowNull: true,
  },
  selectedColor: {
    type: DataTypes.STRING,
    field: "selected_color",
    allowNull: true,
  },
}, {
  tableName: "cart_items",
  underscored: true,
});

export default CartItem;
