import express from "express";
import { productController } from "../controllers/productsController";
import { commentController } from "../controllers/commentsController";

const router = express.Router();
router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProduct);

router.post("/", productController.createProduct);

router.patch("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

router.get("/:id/comments", commentController.getAllProductComments);

router.post("/:id/comments", commentController.createProductComment);

router.delete("/comments/:id", commentController.deleteComment);

router.patch("/comments/:id", commentController.updateComment);

export default router;
