// backend/config/db.js
import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js"; // ✅ SAME folder, so use "./"

export const connectionDb = async () => {
  try {
    if (!ENV_VARS.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(ENV_VARS.MONGO_URI); // No need to pass deprecated options
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
