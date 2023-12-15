import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Order from "../models/order.js";
import { sendEmailWithNodemailer } from "../helpers/email.js";

dotenv.config();

/**
 * things to fix before saving user to db:
 * add validation
 * check if email is taken
 * hash password
 * @param {*} req
 * @param {*} res
 */
export const register = async (req, res) => {
  try {
    /** 1. destructure name, email, password from req.body */
    const { name, email, password } = req.body;

    /** 2. all fields require validation */
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is taken" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }

    /** 3. check if email is taken */
    // const existingUser = await User.findOne({ email: email });
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email is taken" });
    }

    /** 4. hash password */
    const hashedPassword = await hashPassword(password);

    /** 5. register user */
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    /** 6. create signed jwt */
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    /** 7. send response */
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * things to fix before saving user to db:
 * add validation
 * check if email is taken
 * hash password
 * @param {*} req
 * @param {*} res
 */
export const login = async (req, res) => {
  try {
    /** 1. destructure name, email, password from req.body */
    const { email, password } = req.body;

    /** 2. all fields require validation */
    if (!email) {
      return res.json({ error: "Email is taken" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }

    /** 3. check if email is taken */
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    /** 4. compare password */
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }

    /** 5. create signed jwt */
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    /** 7. send response */
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, password, address } = req.body;
    const user = await User.findById(req.user._id);
    // check password length
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and should be min 6 characters long",
      });
    }
    // hash password
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        address: address || user.address,
      },
      { new: true }
    );
    updated.password = undefined;
    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};

export const signup = async (req, res) => {
  try {
    console.log("signup new 1");
    /** 1. Destructure email from req.body */
    // const { email } = req.body;
    const { name, email, password } = req.body;
    console.log("signup name", name);
    console.log("signup email", email);
    console.log("signup password", password);

    /** 2. All fields require validation */
    if (!email) {
      return res.json({ error: "Email is taken" });
    }

    /** 3. Check if email is taken */
    // const user = await User.findOne({ email });
    //if (user) {
    //return res.json({ error: "User not found" });
    // }

    /** 5. create signed jwt */
    /*const token1 = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });*/

    /*const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });*/

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );

    // send email with token
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: "texmex430@gmail.com",
      subject: `Account activation link`,
      html: `
          <h1>Please use the following link to activate your account</h1>
          <p><a href="${process.env.CLIENT_URL}/activation/${token}">Lien</p>
          <hr />
          <p>This email may contain sensetive information</p>
          <p>${process.env.CLIENT_URL}</p>
      `,
    };

    try {
      await sendEmailWithNodemailer(req, res, emailData);
    } catch (err) {
      console.log(err);
    }

    /** 7. send response */
    /*res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });*/
  } catch (err) {
    console.log(err);
  }

  // Message
};

export const accountActivation = async (req, res) => {
  try {
    console.log("acti");
    const token = req.params.token;
    console.log("2=", token);
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);
      const { name, email, password } = decoded;

      console.log("decoded", decoded);
      console.log("decoded name", name);
      console.log("decoded email", email);
      console.log("decoded password", password);

      // const user = new User({ name, email, password });

      /** 1. destructure name, email, password from req.body */
      //const { name, email, password } = req.body;

      /** 2. all fields require validation */
      if (!name.trim()) {
        return res.json({ error: "Name is required" });
      }
      if (!email) {
        return res.json({ error: "Email is taken" });
      }
      if (!password || password.length < 6) {
        return res.json({
          error: "Password must be at least 6 characters long",
        });
      }

      /** 3. check if email is taken */
      // const existingUser = await User.findOne({ email: email });
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ error: "Email is taken" });
      }

      /** 4. hash password */
      const hashedPassword = await hashPassword(password);

      /** 5. register user */
      const user = await new User({
        name,
        email,
        password: hashedPassword,
      }).save();

      /** 6. create signed jwt */
      const token1 = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      /** 7. send response */
      res.json({
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address,
        },
        token1,
      });

      // req.user = decoded;

      console.log(jwt.decode(token));
      // const user1 = await User.findById(req.user._id);
      console.log(user);
      /*jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
          console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err);
          return res.status(401).json({
            error: "Expired link. Signup again",
          });
        }

        const { name, email, password } = jwt.decode(token);

        console.log(name);
        console.log(email);
        console.log(password);
        const user = new User({ name, email, password });
      });*/
    }
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = async (req, res) => {
  try {
    console.log(req.user._id);
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    console.log("orders => ", orders);
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products", "-photo")
      .populate("buyer", "name");
    // .sort({ createdAt: "-1" });
    // console.log("server=>", orders);
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};
