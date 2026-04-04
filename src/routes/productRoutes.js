import express from "express";
import * as productController from "../controllers/productController.js";

const router = express.Router();

router.post("/", productController.createProduct);

export default router;
