import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import CafeStatus from "../models/CafeStatus.js";

const router = express.Router();

// ✅ PUBLIC - Frontend customers can check status
router.get("/", async (req, res) => {
  try {
    const status = await CafeStatus.findOne().sort({ updatedAt: -1 }).lean();
    res.json(status || { isOnline: true, message: "We're open! Place your order now 🎉" });
  } catch (error) {
    console.error("Cafe status fetch error:", error);
    res.status(500).json({ message: "Server error", isOnline: true });
  }
});

// ✅ PROTECTED - Staff/Owner can update
router.put("/", protect, async (req, res) => {
  try {
    const { isOnline, message } = req.body;
    
    if (!message || message.trim().length < 5) {
      return res.status(400).json({ message: "Message must be at least 5 characters" });
    }

    const status = await CafeStatus.findOneAndUpdate(
      {},
      { 
        isOnline, 
        message: message.trim(),
        updatedBy: req.user._id 
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      data: status,
      message: `Cafe status updated to ${isOnline ? 'ONLINE' : 'OFFLINE'}`
    });
  } catch (error) {
    console.error("Cafe status update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;