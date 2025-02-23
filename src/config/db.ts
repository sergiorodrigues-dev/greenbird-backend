import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const clientOptions: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 5000, // Timeout to avoid infinite connection
};

export async function connectDB() {
  if (!MONGO_URI) {
    throw new Error("DB URI is required");
  }
  try {
    await mongoose.connect(MONGO_URI, clientOptions);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Close app in case of error
  }
}
