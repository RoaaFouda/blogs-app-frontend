import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../providers/UserProvider";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

export default function Blogs(props) {
  const { blogs, handleUIDelete, loading } = props;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axiosInstance.delete(`/blogs/${blogId}`);
        handleUIDelete(blogId);
        navigate("/");
        toast.success("Blog deleted successfully");
      } catch (err) {
        toast.error("Failed to delete blog");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Blog Posts</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="text-center font-extrabold">
              Loading...
            </div>
          ) : (

            blogs.map((blog) => (
              <div
                key={blog.id}
                className="card bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                {/* Cover Image */}
                <figure className="px-0 pt-0 h-48 overflow-hidden bg-gray-200">
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                      <span className="text-white text-sm">No Image</span>
                    </div>
                  )}
                </figure>

                <div className="card-body grow flex flex-col">
                  {/* Title */}
                  <h2 className="card-title text-xl font-bold line-clamp-2">
                    {blog.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {blog.description}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                    <div className="avatar placeholder shrink-0">
                      <div className="bg-linear-to-br from-blue-400 to-purple-500 text-white rounded-full w-10 flex items-center justify-center">
                        <span className="text-sm font-bold">
                          {blog.user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        Author
                      </p>
                      <p className="text-xs text-gray-500">
                        {blog.user.username}
                      </p>
                    </div>
                  </div>

                  {/* Date Info */}
                  <div className="text-xs text-gray-500 space-y-1 mb-4">
                    <p>
                      Created: {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                      <p>
                        Updated: {new Date(blog.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* Actions Section */}
                  <div className="mt-auto space-y-4">
                    {user && user.username === blog.user.username && (
                      <div className="flex gap-2">
                        <button
                          className="btn btn-sm btn-outline flex-1"
                          onClick={() => navigate(`/blog-form/${blog.id}`)}
                          title="Edit blog"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline btn-error flex-1"
                          onClick={() => handleDelete(blog.id)}
                          title="Delete blog"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L19.13 2.62a1.5 1.5 0 00-1.318-.75h-11.604a1.5 1.5 0 00-1.318.75l-2.257 6.144M5.25 5.475c.342.052.682.107 1.022.166M3 9h18M3.75 10.5h16.5"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    )}

                    {/* Read More Button */}
                    <button
                      className="btn btn-primary btn-sm w-full"
                      onClick={() => navigate(`/blog/${blog.id}`)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Empty State */}
        {!loading && props.blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blogs found</p>
          </div>
        )}
      </div>

      {user && (
        <button
          className="fab pointer-events-auto"
          onClick={() => navigate("/blog-form/new")}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn btn-lg btn-circle text-white bg-black"
          >
            <svg
              aria-label="New"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </button>
      )}
    </div>
    
  );
}
