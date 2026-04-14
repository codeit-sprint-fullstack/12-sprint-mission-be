import express from "express";
import {
  createProductComment,
  getProductComments,
  updateProductComment,
  deleteProductComment,
} from "../controllers/productCommentController.js";

const router = express.Router();

router.post("/:id/comments", createProductComment);
router.get("/:id/comments", getProductComments);

router.patch("/comments/:id", updateProductComment);
router.delete("/comments/:id", deleteProductComment);

export default router;
