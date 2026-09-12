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

              {isLogin && (
        <div className="mt-4 text-sm text-center bg-slate-100 border border-slate-200 rounded-md px-4 py-2">
          <p className="font-medium text-slate-600">Demo credentials</p>
          <p className="text-slate-500">
            username: <span className="font-mono">roaaa</span>
          </p>
          <p className="text-slate-500">
            password: <span className="font-mono">12345678</span>
          </p>
        </div>
      )}
      </p>
    </div>
  );
}
