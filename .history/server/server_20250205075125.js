import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
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

// Allowed Origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://expense-tracker-assignment-ccya.vercel.app",
];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS: ", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
