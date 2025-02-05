// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";

// Import Routes
import AuthRoutes from "./routes/Authroutes.js";
import ExpenseRoutes from "./routes/ExpenseRoutes.js";

// Error Middleware
import { errorHandler } from "./middlewares/errorHandler.js";

// Configure Environment
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
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
app.use("/api/auth", AuthRoutes);
app.use("/api/expenses", ExpenseRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// middlewares/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || "Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
