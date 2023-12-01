import express from "express";

/** Controllers */
import {
  register,
  login,
  secret,
  updateProfile,
  getOrders,
  allOrders,
} from "../controllers/auth.js";
/** Middleware */
import { requireSignin, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});
router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
  res.json({ ok: true });
});
router.put("/profile", requireSignin, updateProfile);

// orders
router.get("/orders", requireSignin, getOrders);
router.get("/all-orders", requireSignin, isAdmin, allOrders);

// testing
router.get("/secret", requireSignin, isAdmin, secret);

export default router;
