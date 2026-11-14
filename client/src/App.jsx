
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import About from "./pages/About";
import EditBlog from "./pages/EditBlog";
import AdminDashboard from "./pages/AdminDashboard";
import ManageBlogs from "./pages/ManageBlogs";
import AddBlog from "./pages/AddBlog";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Categories from "./pages/Categories";
function App() {
  return (
    <Routes>
      {/* User Website */}
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/about" element={<About />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Pages */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/blogs" element={<ManageBlogs />} />
        <Route path="/admin/add-blog" element={<AddBlog />} />
        <Route path="/admin/edit-blog/:id" element={<EditBlog />} />
      </Route>
    </Routes>
  );
}

export default App;
