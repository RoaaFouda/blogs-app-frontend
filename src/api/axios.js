import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3000/api/" });

axiosInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if(token){
    req.headers.Authorization = `Bearer ${token}`;
  }

   req.headers["Content-Type"] = "application/json";
  
  return req;
});


export default axiosInstance;
