import express from "express";
import setResource from "../../middleware/resource.middleware.js";
import validateId from "../../middleware/validate-id.middleware.js";
import * as productController from "./product.controller.js";
import * as commentController from "../comment/comment.controller.js";

const router = express.Router();

router.use(setResource("상품"));

router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
router.get("/:id", validateId, productController.getProduct);
router.patch("/:id", validateId, productController.updateProduct);
router.delete("/:id", validateId, productController.deleteProduct);

router.get("/:id/comments", validateId, commentController.getProductComments);
router.post(
  "/:id/comments",
  validateId,
  commentController.createProductComment,
);

export default router;
