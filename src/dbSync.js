import dotenv from "dotenv";
import db from "./models/index.js";

dotenv.config();

async function syncDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection established.");
    await db.sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Unable to sync database:", error);
    process.exit(1);
  }
}

syncDatabase();
