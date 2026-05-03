import express from "express";

// Import Controllers
import { hello } from "../controllers/testController.js";

const router = express.Router();

router.get("/hello", hello);

export default router;
