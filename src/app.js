import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";
import { notFound } from "./middlewares/notFoundMiddleware.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", protect, productRoutes);
app.use("/cart", protect, cartRoutes);
app.use("/users", protect, userRoutes);
app.use("/checkout", protect, checkoutRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "API is working correctly",
  });
});

app.use(notFound);

export default app;
