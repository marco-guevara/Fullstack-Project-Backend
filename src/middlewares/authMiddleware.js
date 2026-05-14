import jwt from "jsonwebtoken";
import { authCookieName } from "../config/cookies.js";
import db from "../models/index.js";

export async function protect(req, res, next) {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured.",
      });
    }

    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
    const token = req.cookies?.[authCookieName] || bearerToken;

    if (!token) {
      return res.status(401).json({
        message: "Authentication token is required.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "User no longer exists.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired authentication token.",
    });
  }
}
