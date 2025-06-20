import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === "") {
      return blogs;
    }
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div>
      <div className="flex justify-center sm-gap-8 my-10">
        {blogCategories.map((item) => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            className={`flex justify-center px-6 py-2 rounded-full cursor-pointer ${
              menu === item
                ? "bg-primary text-white"
                : "text-gray-700 hover:text-black"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category.toLowerCase() === menu.toLocaleLowerCase()))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
