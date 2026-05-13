import express from "express";
import authRoutes from "./routes/authRoutes.js";
import { notFound } from "./middlewares/notFoundMiddleware.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "API is working correctly",
  });
});

app.use(notFound);

export default app;
