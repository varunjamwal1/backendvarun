import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "../config/db.js";
import cafeStatusRoutes from "../routes/cafeStatusRoutes.js";
import authRoutes from "../routes/authRoutes.js";
import categoryRoutes from "../routes/categoryRoutes.js";
import itemRoutes from "../routes/itemRoutes.js";
import tableRoutes from "../routes/tableRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
import taxRoutes from "../routes/taxRoutes.js";

const app = express();

/* ---------------- CORS ---------------- */
// Allow all origins in development; restrict in production via env var
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://neon-cat-e75f45.netlify.app",
  process.env.FRONTEND_URL,
].filter(Boolean); // remove undefined/null values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "x-auth-token", "Authorization"],
  })
);

// Explicitly handle preflight OPTIONS requests (regex avoids Express 5 path-to-regexp issue with "*")
app.options(/.*/, cors());

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- DATABASE (lazy connect — safe for serverless) ---------------- */
let isConnected = false;

const connectIfNeeded = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

// Connect DB before handling any request
app.use(async (req, res, next) => {
  try {
    await connectIfNeeded();
    next();
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    res.status(500).json({ message: "Database connection error" });
  }
});

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/taxes", taxRoutes);
app.use("/api/cafe-status", cafeStatusRoutes);

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "🚀 Restaurant API Running" });
});

/* ---------------- EXPORT for Vercel ---------------- */
export default app;