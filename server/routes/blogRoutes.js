
const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getPublishedBlogs,
  getBlogById,
  incrementBlogView,
  getTotalViews,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// Public routes
router.get("/published", getPublishedBlogs);
router.get("/stats/views", getTotalViews);
router.post("/:id/view", incrementBlogView);
router.get("/:id", getBlogById);

// Admin routes (authentication will be added next)
router.post("/", createBlog);
router.get("/", getAllBlogs);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
