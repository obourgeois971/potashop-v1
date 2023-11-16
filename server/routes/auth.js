import express from "express";

/** Controllers */
import { register, login, secret } from "../controllers/auth.js";
/** Middleware */
import { requireSignin, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// testing
router.get("/secret", requireSignin, isAdmin, secret);

export default router;
