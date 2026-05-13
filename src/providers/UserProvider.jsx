import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

export const UserContext = createContext(null);

export default function UserProvider(props) {
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    (async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const res = await axiosInstance.get("/users/me");
          setUser(res.data.data.user);
        } catch (err) {
          toast.error("Failed to fetch user:");
          console.error("Failed to fetch user:", err);
        }
      } else {
        setUser(null);
      }
    })()
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUser}}>
      {props.children}
    </UserContext.Provider>
  );
}
