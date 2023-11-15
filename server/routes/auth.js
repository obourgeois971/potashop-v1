import express from "express";
/** Controllers */
import { users } from "../controllers/auth.js";

const router = express.Router();

router.get("/users", users);

export default router;
