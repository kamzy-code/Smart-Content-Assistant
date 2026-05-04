import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/createDB.js";
import app from "./app.js";
dotenv.config();

const PORT = process.env.PORT || 5001;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
