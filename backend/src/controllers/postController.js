import { prisma } from "../config/db.js";
import { listPostsSchema } from "../validators/postValidator.js";

// GET /posts/:slug
export const getPost = async (req, res) => {
  const { slug } = req.params;

  try {
    const post = await prisma.post.findFirst({
      where: { slug, status: "published" },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        content: true,
        thumbnailUrl: true,
        readingTimeMinutes: true,
        publishedAt: true,
        author: { select: { id: true, name: true, avatarUrl: true } },
        postTags: {
          select: { tag: { select: { id: true, name: true, slug: true } } },
        },
        _count: { select: { reactions: true, comments: true } },
      },
    });

    if (!post) {
      return res.status(404).json({
        error: { code: "NOT_FOUND", message: "Post not found" },
      });
    }

    // If user is logged in, check their reaction and bookmark status in parallel
    const [reaction, bookmark] = await Promise.all([
      req.user
        ? prisma.reaction.findUnique({
            where: { postId_userId: { postId: post.id, userId: req.user.id } },
          })
        : null,
      req.user
        ? prisma.bookmark.findUnique({
            where: { userId_postId: { userId: req.user.id, postId: post.id } },
          })
        : null,
    ]);

    const { postTags, _count, ...rest } = post;

    return res.json({
      post: {
        ...rest,
        tags: postTags.map((pt) => pt.tag),
        reactionCount: _count.reactions,
        commentCount: _count.comments,
        isReacted: !!reaction,
        isBookmarked: !!bookmark,
      },
    });
  } catch (err) {
    console.error("getPost error:", err);
    return res.status(500).json({
      error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
    });
  }
};

export const listPosts = async (req, res) => {
  const result = listPostsSchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid query parameters",
        details: result.error.flatten().fieldErrors,
      },
    });
  }

  const { page, limit, tag, authorId, sort } = result.data; // Those paramters are used for frontend to render the list of posts - the numbers per page
  const skip = (page - 1) * limit;
  const where = {
    status: "published",
    ...(tag && { postTags: { some: { tag: { slug: tag } } } }),
    ...(authorId && { authorId }),
  };

  try {
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: sort === "newest" ? "desc" : "asc" },
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          thumbnailUrl: true,
          readingTimeMinutes: true,
          publishedAt: true,
          author: {
            select: { id: true, name: true, avatarUrl: true },
          },
          postTags: {
            select: { tag: { select: { id: true, name: true, slug: true } } },
          },
          _count: { select: { reactions: true, comments: true } },
        },
      }),
      prisma.post.count({ where }),
    ]);

    const formatted = posts.map(({ postTags, _count, ...p }) => ({
      ...p,
      tags: postTags.map((pt) => pt.tag),
      reactionCount: _count.reactions,
      commentCount: _count.comments,
    }));

    return res.json({ posts: formatted, page, limit, total });
  } catch (err) {
    console.error("listPosts error:", err);
    return res.status(500).json({
      error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
    });
  }
};
