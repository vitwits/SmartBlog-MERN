import mongoose from "mongoose";

// Schema
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String },
    description: { type: String, required: true },
    category: { type: String },
    image: { type: String, required: true },
    isPublished: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// Model
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
