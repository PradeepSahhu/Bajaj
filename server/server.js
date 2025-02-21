import dotenv from "dotenv";
import { app } from "./app.js";
import DatabaseConnection from "./src/database/DatabaseConnection.js";

dotenv.config({
  path: ".env",
});

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    try {
      await DatabaseConnection();
      isConnected = true;
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      return res.status(500).json({ error: "Database connection failed" });
    }
  }

  app(req, res);
}
