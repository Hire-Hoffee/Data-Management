import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  headers: {
    "x-auth": "supersecrettoken_for_user4221",
  },
});

export default api;
