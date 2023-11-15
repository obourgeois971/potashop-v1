/*
 * Imports
 */
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

/** Execute Express */
const app = express();

/** data base connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB ERROR => ", err));

/** Router middleware */
app.use("/api", authRoutes);

/** Run This Server */
app.listen(PORT, () => {
  console.log(`Node server is running on port ${PORT}`);
});
