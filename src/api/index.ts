import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(function (config) {
  config.headers["x-auth"] = localStorage.getItem("token") || "";
  return config;
});

export default api;
