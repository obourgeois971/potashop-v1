import express from "express";

/** Controllers */
import { create } from "../controllers/category.js";

/** Middleware */
import { requireSignin, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/category", requireSignin, isAdmin, create);

export default router;
