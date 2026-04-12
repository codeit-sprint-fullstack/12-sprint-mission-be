import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productsController.js";
import {
  createProductComment,
  deleteComment,
  getAllProductComments,
  updateComment,
} from "../controllers/commentsController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProduct);

router.post("/", createProduct);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.get("/:id/comments", getAllProductComments);

router.post("/:id/comments", createProductComment);

router.delete("/:id/comments", deleteComment);

router.patch("/:id/comments", updateComment);

export default router;
