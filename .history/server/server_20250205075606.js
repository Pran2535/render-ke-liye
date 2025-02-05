import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

// Error Middleware
import { errorHandler } from "./middlewares/errorHandler.js";
import path from "path";

// Configure Environment
dotenv.config();

const app = express();

const _dirname = path.resolve();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Global Error Handler
app.use(errorHandler);

// Serve the static files from the frontend after build
app.use(express.static(path.join(_dirname, "/frontend/build")));

// Catch-all route for frontend SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
