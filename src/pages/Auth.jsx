import { useState } from "react";
import Login from "../components/login";
import Register from "../components/Resgister";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const onClick = () => {
    isLogin ? setIsLogin(false) : setIsLogin(true);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-8 md:px-16 py-8  bg-slate-50">
    {isLogin ? <Login /> : <Register />}
      <p className="text-sm mt-6">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span
          className="link link-primary font-semibold hover:underline cursor-pointer"
          onClick={onClick}
        >
          {isLogin ? "SignUp" : "Login"}
        </span>
      </p>
    </div>
  );
}
