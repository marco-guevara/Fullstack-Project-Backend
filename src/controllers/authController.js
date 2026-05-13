import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

function createToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return jwt.sign(
    {
      userId: user.userId,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    },
  );
}

function formatUser(user) {
  return {
    userId: user.userId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    postalCode: user.postalCode,
    country: user.country,
    phone: user.phone,
  };
}

export async function register(req, res) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      country,
      phone,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const existingUser = await db.User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "A user with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await db.User.create({
      email: email.toLowerCase(),
      passwordHash,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      country,
      phone,
    });
    const token = createToken(user);

    return res.status(201).json({
      message: "User registered successfully.",
      token,
      user: formatUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to register user.",
      error: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const user = await db.User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = createToken(user);

    return res.status(200).json({
      message: "User logged in successfully.",
      token,
      user: formatUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to login user.",
      error: error.message,
    });
  }
}
