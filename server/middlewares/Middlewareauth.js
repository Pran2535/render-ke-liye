import jwt from "jsonwebtoken";
import { User } from "../model/User.js";
import { generateAccessToken } from "../config/jwt.js";

export const authenticateToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).json({ message: "Token expired" });
    }

    try {
      const refreshDecoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await User.findById(refreshDecoded.id);

      if (!user) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const newAccessToken = generateAccessToken(user._id);

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
      });

      req.user = user;
      next();
    } catch (refreshError) {
      return res.status(401).json({ message: "Refresh token invalid" });
    }
  }
};
