import { Router } from "express";
import {
  addCartItem,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "../controllers/cartController.js";

const router = Router();

router.get("/", getCart);
router.post("/items", addCartItem);
router.patch("/items/:cartItemId", updateCartItem);
router.delete("/items/:cartItemId", deleteCartItem);

export default router;
