import express from "express";
import setResource from "../middleware/setResource.js";
import * as productController from "../controllers/productController.js";

const router = express.Router();

router.use(setResource("상품"));

router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
router.get("/:id", productController.getProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
