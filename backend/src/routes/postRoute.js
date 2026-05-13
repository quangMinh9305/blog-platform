import express from "express";
import { listPosts, getPost } from "../controllers/postController.js";
import { optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", listPosts);
router.get("/:slug", optionalAuth, getPost);

// TODO: GET    /:slug          — getPost
// TODO: GET    /:slug/related  — getRelatedPosts
// TODO: POST   /               — createPost   (auth)
// TODO: PATCH  /:id            — updatePost   (auth + owner)
// TODO: DELETE /:id            — deletePost   (auth + owner/admin)
// TODO: GET    /me/posts       — getMyPosts   (auth)  ← mounted separately at /api/me

export default router;
