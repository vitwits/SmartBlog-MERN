import fs from "fs";
import imagekit from "../config/imageKit.js";
import Blog from "../models/Blog.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    console.log("image path", imageFile.path);
    console.log("file buffer", fileBuffer);

    // Upload Image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // Optimize image with ImageKit
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    return res
      .status(201)
      .json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    console.error("Error adding blog:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error("Error adding blog:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const {blogId} = req.params;
    const blog = await Blog.findById(blogId)
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    return res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error("Error adding blog:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}