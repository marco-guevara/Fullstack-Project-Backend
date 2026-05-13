import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const {
  DATABASE_URL,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_SCHEMA,
  DATABASE_SSL,
  DATABASE_SSL_REJECT_UNAUTHORIZED,
  DATABASE_POOL_MAX,
  DATABASE_POOL_MIN,
  DATABASE_POOL_IDLE,
  DATABASE_POOL_ACQUIRE,
} = process.env;

const shouldUseSsl = DATABASE_SSL === "true";
const rejectUnauthorized = DATABASE_SSL_REJECT_UNAUTHORIZED !== "false";

const databaseOptions = {
  host: DATABASE_HOST || "localhost",
  port: DATABASE_PORT ? Number(DATABASE_PORT) : 5432,
  dialect: "postgres",
  schema: DATABASE_SCHEMA || "public",
  logging: false,
  pool: {
    max: DATABASE_POOL_MAX ? Number(DATABASE_POOL_MAX) : 5,
    min: DATABASE_POOL_MIN ? Number(DATABASE_POOL_MIN) : 0,
    idle: DATABASE_POOL_IDLE ? Number(DATABASE_POOL_IDLE) : 10000,
    acquire: DATABASE_POOL_ACQUIRE ? Number(DATABASE_POOL_ACQUIRE) : 30000,
  },
  dialectOptions: shouldUseSsl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized,
        },
      }
    : {},
  define: {
    underscored: true,
    timestamps: true,
  },
};

const sequelize = DATABASE_URL
  ? new Sequelize(DATABASE_URL, databaseOptions)
  : new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, databaseOptions);

export default sequelize;
