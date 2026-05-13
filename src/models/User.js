import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.UUID,
    field: "user_id",
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  passwordHash: {
    type: DataTypes.STRING,
    field: "password_hash",
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    field: "first_name",
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    field: "last_name",
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postalCode: {
    type: DataTypes.STRING,
    field: "postal_code",
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "users",
  underscored: true,
});

export default User;
