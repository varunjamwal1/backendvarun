import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Error:', err.message);
    // ✅ Throw instead of process.exit() — process.exit() kills serverless functions
    // before they can send a response, causing "Network Error - No response" in the browser
    throw err;
  }
};

export default connectDB;