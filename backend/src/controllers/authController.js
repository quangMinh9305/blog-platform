import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  res.json({ message: "My first API" });
};

export { register };
