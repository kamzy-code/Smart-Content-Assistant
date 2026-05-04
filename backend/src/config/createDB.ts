import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL as string);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err: any) {
    console.error(`Mongo DB connection error: ${err.message}`, {
      stack: err.stack,
      service: "dbService",
      action: "CONNECT_DB_FAILED"
    });
    process.exit(1); // Exit the process with failure
  }
};
