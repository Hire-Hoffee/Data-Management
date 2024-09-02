import axios from "axios";

const api = axios.create({
  baseURL: "https://test.v5.pryaniky.com",
  timeout: 1000,
  headers: { "x-auth": localStorage.getItem("token") || "" },
});

export default api;
