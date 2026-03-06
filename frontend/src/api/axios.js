import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  const publicRoutes = ["accounts/login/", "accounts/register/"];
  const isPublicRoute = publicRoutes.some(route => config.url.includes(route));
  
  if (token && !isPublicRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default API;