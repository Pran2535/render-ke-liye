import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet"; // Added for security

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

// Error Middleware
import { errorHandler } from "./middlewares/errorHandler.js";

// Configure Environment
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for Security
app.use(helmet()); // Added Helmet for basic security headers

// CORS Middleware - Allowing credentials and specific origin
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your deployed frontend if needed
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowing these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowing specific headers
    credentials: true, // Allowing credentials (cookies or auth tokens)
  })
);

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

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
