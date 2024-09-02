import axios from "axios";

const api = axios.create({
  baseURL: "https://test.v5.pryaniky.com",
  timeout: 1000,
  headers: {
    "x-auth": "supersecrettoken_for_user4221",
  },
});

export default api;
