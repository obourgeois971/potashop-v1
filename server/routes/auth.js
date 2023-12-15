import express from "express";

/** Controllers */
import {
  register,
  login,
  secret,
  updateProfile,
  getOrders,
  allOrders,
  signup,
  accountActivation,
} from "../controllers/auth.js";
/** Middleware */
import { requireSignin, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/profile", requireSignin, updateProfile);
router.post("/signup", signup);
router.post("/activation/:token", accountActivation);
// router.post("/forgot-password", forgotPassword);

/** Orders */
router.get("/orders", requireSignin, getOrders);
router.get("/all-orders", requireSignin, isAdmin, allOrders);

/** Testing */
router.get("/secret", requireSignin, isAdmin, secret);
router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});
router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
  res.json({ ok: true });
});

export default router;
