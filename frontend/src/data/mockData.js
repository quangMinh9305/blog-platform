// Mock data for the blog platform

export const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    bio: "Full-stack developer passionate about React and Node.js",
    role: "writer",
    followersCount: 245,
    followingCount: 89,
    postsCount: 12,
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    bio: "DevOps engineer and cloud architecture enthusiast",
    role: "writer",
    followersCount: 189,
    followingCount: 156,
    postsCount: 8,
    createdAt: "2024-02-20T14:30:00Z"
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "Platform administrator",
    role: "admin",
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
    createdAt: "2024-01-01T00:00:00Z"
  }
];

export const mockTags = [
  { id: "1", name: "JavaScript", slug: "javascript" },
  { id: "2", name: "React", slug: "react" },
  { id: "3", name: "Node.js", slug: "nodejs" },
  { id: "4", name: "Python", slug: "python" },
  { id: "5", name: "Data Structures", slug: "data-structures" },
  { id: "6", name: "Algorithms", slug: "algorithms" },
  { id: "7", name: "System Design", slug: "system-design" },
  { id: "8", name: "DevOps", slug: "devops" }
];

export const mockPosts = [
  {
    id: "1",
    title: "Understanding Binary Search Trees",
    slug: "understanding-binary-search-trees",
    content: `<h2>What is a Binary Search Tree?</h2>
<p>A Binary Search Tree (BST) is a data structure that maintains sorted data and allows for efficient operations like search, insert, and delete.</p>

<h2>Key Properties</h2>
<ul>
<li>All nodes in the left subtree are less than the root</li>
<li>All nodes in the right subtree are greater than the root</li>
<li>Both subtrees are also BSTs</li>
</ul>

<h2>Operations</h2>
<p>The main operations include insertion, deletion, and searching, all with O(log n) time complexity in a balanced tree.</p>`,
    excerpt: "A comprehensive guide to understanding Binary Search Trees, their properties, and common operations.",
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    author: mockUsers[0],
    status: "published",
    tags: [mockTags[4], mockTags[5]],
    views: 1240,
    likes: 42,
    comments: 8,
    readingTime: 5,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: "2",
    title: "System Design Basics: Load Balancing",
    slug: "system-design-basics-load-balancing",
    content: `<h2>Introduction to Load Balancing</h2>
<p>Load balancing is a critical component in distributed systems that helps distribute incoming network traffic across multiple servers.</p>

<h2>Types of Load Balancers</h2>
<h3>Hardware Load Balancers</h3>
<p>Dedicated hardware devices that handle traffic distribution.</p>

<h3>Software Load Balancers</h3>
<p>Software solutions like NGINX, HAProxy, and cloud-based solutions.</p>`,
    excerpt: "Learn the fundamentals of load balancing and how it improves system performance and reliability.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    author: mockUsers[1],
    status: "published",
    tags: [mockTags[6], mockTags[7]],
    views: 850,
    likes: 28,
    comments: 4,
    readingTime: 8,
    createdAt: "2025-01-10T14:30:00Z",
    updatedAt: "2025-01-10T14:30:00Z"
  },
  {
    id: "3",
    title: "Introduction to Redis Caching",
    slug: "introduction-to-redis-caching",
    content: `<h2>What is Redis?</h2>
<p>Redis is an open-source, in-memory data structure store that can be used as a database, cache, and message broker.</p>

<h2>Why Use Redis for Caching?</h2>
<ul>
<li>Extremely fast data access</li>
<li>Rich data structures</li>
<li>Persistence options</li>
<li>Built-in replication</li>
</ul>`,
    excerpt: "Discover how Redis can supercharge your application's performance with efficient caching strategies.",
    coverImage: null,
    author: mockUsers[0],
    status: "draft",
    tags: [mockTags[2], mockTags[7]],
    views: 0,
    likes: 0,
    comments: 0,
    readingTime: 6,
    createdAt: "2025-01-18T09:15:00Z",
    updatedAt: "2025-01-18T09:15:00Z"
  }
];

export const mockComments = [
  {
    id: "1",
    content: "Great explanation! The visual examples really helped me understand BST operations.",
    author: mockUsers[1],
    postId: "1",
    createdAt: "2025-01-16T11:30:00Z"
  },
  {
    id: "2",
    content: "Could you elaborate more on the deletion operation for nodes with two children?",
    author: mockUsers[1],
    postId: "1",
    createdAt: "2025-01-16T14:20:00Z"
  }
];

export const mockNotifications = [
  {
    id: "1",
    type: "like",
    message: "Jane Smith liked your post 'Understanding Binary Search Trees'",
    actor: mockUsers[1],
    post: mockPosts[0],
    read: false,
    createdAt: "2025-01-16T10:15:00Z"
  },
  {
    id: "2",
    type: "comment",
    message: "Jane Smith commented on your post 'Understanding Binary Search Trees'",
    actor: mockUsers[1],
    post: mockPosts[0],
    read: false,
    createdAt: "2025-01-16T11:30:00Z"
  },
  {
    id: "3",
    type: "follow",
    message: "Jane Smith started following you",
    actor: mockUsers[1],
    read: true,
    createdAt: "2025-01-15T16:45:00Z"
  }
];

export const mockBookmarks = [
  {
    id: "1",
    userId: "1",
    post: mockPosts[1],
    createdAt: "2025-01-12T08:30:00Z"
  }
];

// Current user (simulating logged-in user)
export const currentUser = mockUsers[0];