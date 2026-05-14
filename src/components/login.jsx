import { useContext, useState } from "react";
import joi from "joi";
import { toast } from "react-toastify";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router";
import { UserContext } from "../providers/UserProvider";

const schema = joi.object({
  username: joi
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .required(),
  password: joi.string().min(6).max(20).required(),
});

export default function Login() {
  const { fetchUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: null,
    password: null,
  });

  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      username: null,
      password: null,
    };

    const { value, error } = schema.validate(formData, { abortEarly: false });

    if (error) {
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
    } else {
      try {
        setIsLoading(true);
        const res = await axiosInstance.post(`/auth/login/`, value);
        setIsLoading(false);
        localStorage.setItem("token", res.data.data.token);
        toast.success(`Welcome back, ${formData.username}`);
        fetchUser();
        navigate("/");
      } catch (err) {
        setIsLoading(false);
        if (err.response?.status === 400) toast.error("Invalid Credentials");
        else toast.error("Something went wrong try again later!");
      }
    }
    setFormErrors(newErrors);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-full sm:w-96 px-4 sm:px-0">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="label text-black">
            <span className="label-text">Username</span>
          </label>
          <input
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
            name="username"
            id="username"
            type="text"
            placeholder="username..."
            className={`input input-bordered w-full ${formErrors.username ? "input-error" : ""}`}
          />
          {formErrors.username && (
            <label className="label">
              <span className="label-text-alt text-error">
                {formErrors.username}
              </span>
            </label>
          )}
        </div>
        <div>
          <label htmlFor="password" className="label text-black">
            <span className="label-text">Password</span>
          </label>
          <input
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            name="password"
            id="password"
            type="password"
            placeholder="password..."
            className={`input input-bordered w-full ${formErrors.password ? "input-error" : ""}`}
          />
          {formErrors.password && (
            <label className="label">
              <span className="label-text-alt text-error">
                {formErrors.password}
              </span>
            </label>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
