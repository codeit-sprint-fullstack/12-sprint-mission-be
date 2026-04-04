import express from "express";
import * as productController from "../controllers/productController.js";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/:id", productController.getProduct);

export default router;
