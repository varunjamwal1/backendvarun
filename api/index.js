import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import cafeStatusRoutes from "../routes/cafeStatusRoutes.js";
import authRoutes from "../routes/authRoutes.js";
import categoryRoutes from "../routes/categoryRoutes.js";
import itemRoutes from "../routes/itemRoutes.js";
import tableRoutes from "../routes/tableRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
import taxRoutes from "../routes/taxRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ✅ FIXED CORS */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://neon-cat-e75f45.netlify.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Origin:", origin);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false); // ❗ never throw error
      }
    },
    credentials: true,
  })
);

/* ---------------- MIDDLEWARE ---------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- STATIC ---------------- */

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* ---------------- DATABASE ---------------- */

connectDB();

/* ---------------- ROUTES ---------------- */

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/taxes", taxRoutes);
app.use("/api/cafe-status", cafeStatusRoutes);

/* ---------------- ROOT ---------------- */

app.get("/", (req, res) => {
  res.send("🚀 Restaurant API Running");
});

/* ✅ REQUIRED FOR VERCEL */

export default app;