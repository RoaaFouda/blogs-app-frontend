import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
export default function Navbar() {
  const token = localStorage.getItem("token");
  const { user, fetchUser } = useContext(UserContext);

  const handleclick = () => {
    if (token) {
      localStorage.clear();
      fetchUser();
    } 
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Blogger</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>{user && <div>Hi, {user.username}</div>}</li>
          <li>
            {user ? (
              <div onClick={handleclick}>Logout</div>
            ) : (
              <Link to="/auth">Login/Register</Link>
            )}
          </li>
          <li>
            <Link to="/">Blogs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
