// models/CafeStatus.js
import mongoose from "mongoose";

const cafeStatusSchema = new mongoose.Schema({
  isOnline: {
    type: Boolean,
    default: true
  },
  message: {
    type: String,
    default: "We're open! Place your order now."
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model("CafeStatus", cafeStatusSchema);