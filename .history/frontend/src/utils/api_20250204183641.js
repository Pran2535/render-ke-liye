import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Updated to match prefix
  withCredentials: true, // ✅ This is needed for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
