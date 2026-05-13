import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate, useParams } from "react-router";
import joi from "joi";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

const schema = joi.object({
  title: joi.string().min(3).max(20).trim(),
  description: joi.string().min(10).max(200).trim(),
  coverImage: joi.string().uri({
      scheme: ['http', 'https'],
      allowRelative: false,
    })
    .pattern(/\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?$/i)
    .required().messages({'string.empty': 'Image URL is required',
      'string.uri': 'Please enter a valid URL',
      'string.pattern.base': 'Image URL must point to a valid image file (jpg, jpeg, png, gif, webp, svg, or bmp)',
      'any.required': 'Image URL is required',
    }),
  content: joi.string().min(20),
});

export default function BlogForm(props) {
  const { handleAddBlog, blogs, loading, handleEditBlog } = props;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: "",
    content: "",
  });
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const mode = id === "new" ? "add" : "edit";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/auth");
  }, [user]);

  useEffect(() => {
     const blog = blogs.find((blog) => id === blog.id);
    if(user && mode === "edit" && blog.user.id !== user.id) navigate("/auth");
    if (mode === "edit" && !loading) {
      setFormData({
        title: blog.title,
        description: blog.description,
        coverImage: blog.coverImage,
        content: blog.content,
      });
    }
  }, [blogs])

  const [formErrors, setFormErrors] = useState({
    title: null,
    description: null,
    coverImage: null,
    content: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      title: null,
      description: null,
      coverImage: null,
      content: null,
    };

    const { value, error } = schema.validate(
      { ...formData },
      {
        abortEarly: false,
      },
    );

    if (error) {
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
    } else {
      if (mode === "add") {
        try {
          const blog = {
            title: formData.title,
            description: formData.description,
            coverImage: formData.coverImage,
            content: formData.content,
          };
          const res = await axiosInstance.post("/blogs", blog);
          handleAddBlog(res.data.data);
          navigate("/");
          toast.success("Blog Added Successully!");
        } catch (err) {
          toast.error("Something went wrong try again later!");
        }
      } else {
        try {
          const blog = {
            title: formData.title,
            description: formData.description,
            coverImage: formData.coverImage,
            content: formData.content,
          };
          const res = await axiosInstance.patch(`/blogs/${id}`, blog);
          console.log(res.data.data);
          handleEditBlog(res.data.data);
          navigate("/");
          toast.success("Blog Edited Successully!");
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong try again later!");
        }
      }
    }

    setFormErrors(newErrors);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
//console.log(user)
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-8 md:px-16 py-8  bg-slate-50">
      <div className="w-full sm:w-96 px-4 sm:px-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="label text-black">
              <span className="label-text">Title</span>
            </label>
            <input
              value={formData.title}
              onChange={handleChange}
              name="title"
              id="title"
              type="text"
              placeholder="Add your blog's title"
              className={`input input-bordered w-full ${formErrors.title ? "input-error" : ""}`}
            />
            {formErrors.title && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {formErrors.title}
                </span>
              </label>
            )}
          </div>
          <div>
            <label htmlFor="description" className="label text-black">
              <span className="label-text">Descrption</span>
            </label>
            <input
              value={formData.description}
              onChange={handleChange}
              name="description"
              id="description"
              type="text"
              placeholder="Add your blog's description"
              className={`input input-bordered w-full ${formErrors.description ? "input-error" : ""}`}
            />
            {formErrors.description && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {formErrors.description}
                </span>
              </label>
            )}
          </div>
          <div>
            <label htmlFor="coverImage" className="label text-black">
              <span className="label-text">Cover image</span>
            </label>
            <input
              value={formData.coverImage}
              onChange={handleChange}
              name="coverImage"
              id="coverImage"
              type="coverImage"
              placeholder="Please add a valid image URL"
              className={`input input-bordered w-full ${formErrors.coverImage ? "input-error" : ""}`}
            />
            {formErrors.coverImage && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {formErrors.coverImage}
                </span>
              </label>
            )}
          </div>
          <div>
            <label htmlFor="content" className="label text-black">
              <span className="label-text">Content</span>
            </label>
            <textarea
              value={formData.content}
              onChange={handleChange}
              name="content"
              id="content"
              type="text"
              placeholder="Add you blog's main content"
              className={`textarea textarea-bordered w-full ${formErrors.content ? "textarea-error" : ""}`}
            />
            {formErrors.content && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {formErrors.content}
                </span>
              </label>
            )}
          </div>

          <button className="btn btn-primary w-full">Submit</button>
        </form>
      </div>
    </div>
  );
}
