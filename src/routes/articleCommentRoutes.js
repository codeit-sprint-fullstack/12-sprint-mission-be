import express from "express";
import {
  createArticleComment,
  getArticleComments,
  updateArticleComment,
  deleteArticleComment,
} from "../controllers/articleCommentController.js";

const router = express.Router();

router.post("/:id/comments", createArticleComment);
router.get("/:id/comments", getArticleComments);

// 댓글 자체 기준
router.patch("/comments/:id", updateArticleComment);
router.delete("/comments/:id", deleteArticleComment);

export default router;
