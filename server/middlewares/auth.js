import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const requireSignin = (req, res, next) => {
  try {
    console.log("1");
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log("2");
    // console.log("decoded => ", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json(err);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};
