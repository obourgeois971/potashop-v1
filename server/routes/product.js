import express from "express";
import formidable from "express-formidable";

/** Controllers */
import {
  create,
  list,
  read,
  photo,
  remove,
  update,
  filterProducts,
  productsCount,
  listProducts,
  productsSearch,
  relatedProducts,
  getToken,
  processPayment,
} from "../controllers/product.js";

/** Middleware */
import { requireSignin, isAdmin } from "../middlewares/auth.js";
import product from "../models/product.js";

const router = express.Router();

router.post("/product", requireSignin, isAdmin, formidable(), create);
router.get("/products", list);
router.get("/product/:slug", read);
router.get("/product/photo/:productId", photo);
router.delete("/product/:productId", requireSignin, isAdmin, remove);
router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);
router.post("/filtered-products", filterProducts);
router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);
router.get("/products/search/:keyword", productsSearch);
router.get("/related-products/:productId/:categoryId", relatedProducts);

router.get("/braintree/token", requireSignin, getToken);
router.post("/braintree/payment", requireSignin, processPayment);

export default router;
