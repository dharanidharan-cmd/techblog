
const STORAGE_KEY = "techblog_blogs";

// Get all blogs
export const getBlogs = () => {
  const blogs = localStorage.getItem(STORAGE_KEY);
  return blogs ? JSON.parse(blogs) : [];
};

// Save blogs
export const saveBlogs = (blogs) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
};

// Add a new blog
export const addBlog = (blog) => {
  const blogs = getBlogs();

  const newBlog = {
    ...blog,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  saveBlogs([...blogs, newBlog]);

  return newBlog;
};

// Update an existing blog
export const updateBlog = (id, updatedData) => {
  const blogs = getBlogs();

  const updatedBlogs = blogs.map((blog) =>
    blog.id === id ? { ...blog, ...updatedData } : blog
  );

  saveBlogs(updatedBlogs);
};

// Delete a blog
export const deleteBlog = (id) => {
  const blogs = getBlogs();

  const updatedBlogs = blogs.filter(
    (blog) => blog.id !== id
  );

  saveBlogs(updatedBlogs);
};
