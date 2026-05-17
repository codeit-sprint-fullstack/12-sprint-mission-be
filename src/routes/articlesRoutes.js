import express from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  updateArticle,
} from "../controllers/articlesController.js";
import {
  createArticleComment,
  deleteComment,
  getAllArticleComments,
  updateComment,
} from "../controllers/commentsController.js";

const router = express.Router();

router.get("/", getAllArticles);

router.get("/:id", getArticle);

router.post("/", createArticle);

router.patch("/:id", updateArticle);

router.delete("/:id", deleteArticle);

router.get("/:id/comments", getAllArticleComments);

router.post("/:id/comments", createArticleComment);

router.delete("/comments/:id", deleteComment);

router.patch("/comments/:id", updateComment);

export default router;
