import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

// Decode token if present, set req.user = null if not — never blocks the request
export const optionalAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    req.user = user ?? null;
  } catch {
    req.user = null;
  }
  next();
};

// Read the token from the request and check if token is valid
export const authMiddleware = async (req, res, next) => {
  console.log("Auth Middleware reached");

  // "Bearer" play as a role of salt in test in Postman
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }

  try {
    // Verify token and extract the user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: `Error: ${error}` });
  }
};
