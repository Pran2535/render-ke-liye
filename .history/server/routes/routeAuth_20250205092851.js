import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
} from "../controllers/controllerauth.js";
import { authenticateToken } from "../middlewares/Middlewareauth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticateToken, logout);
router.get("/profile", authenticateToken, getProfile);

export default router;
