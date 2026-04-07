import express from "express";
import setResource from "../middleware/setResource.js";
import validateId from "../middleware/validateId.js";
import * as productController from "../controllers/productController.js";

const router = express.Router();

router.use(setResource("상품"));

router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
router.get("/:id", validateId, productController.getProduct);
router.patch("/:id", validateId, productController.updateProduct);
router.delete("/:id", validateId, productController.deleteProduct);

export default router;
