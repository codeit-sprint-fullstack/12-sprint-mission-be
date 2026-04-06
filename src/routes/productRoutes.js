import express from "express";
import setResource from "../middleware/setResource.js";
import validateObjectId from "../middleware/validateObjectId.js";
import * as productController from "../controllers/productController.js";

const router = express.Router();

router.use(setResource("상품"));

router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
router.get("/:id", validateObjectId, productController.getProduct);
router.patch("/:id", validateObjectId, productController.updateProduct);
router.delete("/:id", validateObjectId, productController.deleteProduct);

export default router;
