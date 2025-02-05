import axios from "axios";

const api = axios.create({
  baseURL: "https://render-ke-liye.onrender.com/api", // Updated to match prefix
  withCredentials: true, // ✅ This is needed for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
