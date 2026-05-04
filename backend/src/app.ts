import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import contentController from "./controller/contentController.js";
import { error } from "node:console";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running !");
});

app.post("/api/save-content", contentController.saveContent);
app.get("/api/search-content", contentController.searchContent);
app.post("/api/rewrite-content", contentController.rewriteContent);

app.use(errorHandler)
export default app;
