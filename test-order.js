import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Order from './models/Order.js';
import connectDB from './config/db.js';

async function test() {
  await connectDB();
  try {
    const orderData = {
      customerName: "Test User",
      items: [{
        item: new mongoose.Types.ObjectId(),
        name: "Test Item",
        price: 15.00,
        quantity: 1
      }],
      subtotal: 15.00,
      taxAmount: 0.75,
      totalAmount: 15.75,
      paymentMethod: "cash",
      paymentStatus: "pending"
    };
    
    const o = await Order.create(orderData);
    console.log("Success:", o);
  } catch (err) {
    console.error("Full Error:", err);
    console.error("Stack:", err.stack);
  }
  process.exit(0);
}
test();
