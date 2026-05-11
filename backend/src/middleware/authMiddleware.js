import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

// Read the token from the request and check if token is valid
export const authMiddleware = async (req, res, next) => {
  console.log("Auth Middleware reached");

  // "Bearer" play as a role of salt in test in Postman
  let token;
  if (
    req.header.authorization &&
    req.header.authorization.startsWith("Bearer")
  ) {
    token = req.header.authorization.split(" ")[1];
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
