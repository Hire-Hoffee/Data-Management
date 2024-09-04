import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(function (config) {
  config.headers["x-auth"] = localStorage.getItem("token") || "";
  return config;
});

export default api;
