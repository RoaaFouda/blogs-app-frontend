import React from "react";
import { useParams } from "react-router";

export default function BlogDetails(props) {
  const { blogs, loading } = props;
  const { id } = useParams();

  const blog = blogs.find((blog) => blog.id === id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog Not Found
          </h1>
          <p className="text-gray-600">
            The blog you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Cover Image */}
        <figure className="w-full h-96 overflow-hidden bg-gray-200">
          {blog.coverImage ? (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
              <span className="text-white text-lg">No Image</span>
            </div>
          )}
        </figure>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="avatar placeholder">
                <div className="bg-linear-to-br from-blue-400 to-purple-500 text-white rounded-full w-13 flex items-center justify-center">
                  <span className="text-sm font-bold">
                    {blog.user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {blog.user.username || "Unknown Author"}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Update Info */}
            {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
              <div className="text-xs text-gray-500">
                <p>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-xl text-gray-700 leading-relaxed">
              {blog.description}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-sm md:prose-base max-w-none">
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto mt-8">
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline"
        >
          ← Back to Blogs
        </button>
      </div>
    </div>
  );
}
