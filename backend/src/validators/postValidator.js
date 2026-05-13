import { z } from "zod";

// Validate query params for GET /api/posts
export const listPostsSchema = z.object({
  page:     z.coerce.number().int().positive().default(1),
  limit:    z.coerce.number().int().min(1).max(50).default(10),
  tag:      z.string().optional(),        // tag slug, e.g. "dsa"
  authorId: z.string().uuid().optional(),
  sort:     z.enum(["newest", "oldest"]).default("newest"),
});
