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

/* ---------------- CORS ---------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://neon-cat-e75f45.netlify.app",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
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

/* ---------------- DB ---------------- */

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

/* ❌ REMOVE app.listen */
/* ✅ EXPORT INSTEAD */

export default app;