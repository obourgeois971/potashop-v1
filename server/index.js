/*
 * Imports
 */
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

/** Execute Express */
const app = express();

/** data base connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB ERROR => ", err));

/** Middleware to log request endpoints */
app.use(morgan("dev"));
app.use(express.json());

/** Router middleware */
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);

/** Run This Server */
app.listen(PORT, () => {
  console.log(`Node server is running on port ${PORT}`);
});
