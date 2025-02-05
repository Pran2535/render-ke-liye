import api from "@/utils/api";

const authService = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (credentials) => api.post("/auth/register", credentials),
  logout: () => api.post("/auth/logout"),
  getCurrentUser: () => api.get("/auth/me"),
};

export default authService;
