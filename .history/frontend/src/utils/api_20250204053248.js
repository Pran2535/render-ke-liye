import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // ✅ This is needed for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
