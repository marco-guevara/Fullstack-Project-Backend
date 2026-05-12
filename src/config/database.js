import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_SCHEMA,
} = process.env;

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST || "localhost",
  port: DATABASE_PORT ? Number(DATABASE_PORT) : 5432,
  dialect: "postgres",
  schema: DATABASE_SCHEMA || "public",
  logging: false,
  define: {
    underscored: false,
    timestamps: true,
  },
});

export default sequelize;
