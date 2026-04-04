import express from "express";
import * as productController from "../controllers/productController.js";

const router = express.Router();

router.get("/", productController.getProducts);

export default router;
