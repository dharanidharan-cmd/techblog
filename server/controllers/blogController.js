
const Blog = require("../models/Blog");

// CREATE a new blog
const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// GET all blogs (for admin)
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET published blogs (for visitors)
const getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "Published" })
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET a single blog
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({ blog });
  } catch (error) {
    res.status(400).json({
      message: "Invalid blog ID",
    });
  }
};

// RECORD a published blog view
const incrementBlogView = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      {
        _id: req.params.id,
        status: "Published",
      },
      {
        $inc: { views: 1 },
      },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        message: "Published blog not found",
      });
    }

    res.status(200).json({
      message: "View recorded successfully",
      blog,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getTotalViews = async (req, res) => {
  try {
    const result = await Blog.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
        },
      },
    ]);

    res.status(200).json({
      totalViews: result[0]?.totalViews || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE a blog
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE a blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid blog ID",
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getPublishedBlogs,
  getBlogById,
  incrementBlogView,
  getTotalViews,
  updateBlog,
  deleteBlog,
};
