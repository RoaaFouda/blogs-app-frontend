import { Route, Routes } from "react-router";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";
import Blogs from "./pages/Blogs";
import Navbar from "./components/Navbar";
import UserProvider from "./providers/UserProvider";
import { useEffect, useState } from "react";
import axiosInstance from "./api/axios";
import BlogForm from "./pages/BlogForm";
import BlogDetails from "./pages/BlogDetails";

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axiosInstance("/blogs/");
      setBlogs(res.data.data);
      setLoading(false);
    }

    fetchData();
  }, []);

  const handleAddBlog = (blog) => {
    setBlogs([...blogs, blog]);
  }

  const handleEditBlog = (blog) => {
    let blogsClone = [...blogs];

    blogsClone = blogsClone.map(blg => {
      if (blg.id === blog.id)
        return blog;
      else 
        return blg;
    })

    setBlogs(blogsClone);
  }

  const handleUIDelete = async (blogId) => {
    let blogsClone = [...blogs];

    blogsClone = blogsClone.filter(blg => blg.id != blogId)

    setBlogs(blogsClone);
  };


  return (
    <>
      <UserProvider>
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Blogs blogs={blogs} handleUIDelete={handleUIDelete} loading={loading}/>} />
          <Route path="/blog-form/:id" element={<BlogForm handleAddBlog={handleAddBlog} handleEditBlog={handleEditBlog} blogs={blogs} loading={loading}/>}/>
          <Route path="/blog/:id" element={<BlogDetails loading={loading} blogs={blogs}/>}/>
        </Routes>
      </UserProvider>
    </>
  );
}
