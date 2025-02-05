import axios from "axios";

const api = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true, // ✅ This is needed for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
