import express from "express";
import { commentController } from "../controllers/commentsController";
import { articleController } from "../controllers/articlesController";

const router = express.Router();

router.get("/", articleController.getAllArticles);

router.get("/:id", articleController.getArticle);

router.post("/", articleController.createArticle);

router.patch("/:id", articleController.updateArticle);

router.delete("/:id", articleController.deleteArticle);

router.get("/:id/comments", commentController.getAllArticleComments);

router.post("/:id/comments", commentController.createArticleComment);

router.delete("/comments/:id", commentController.deleteComment);

router.patch("/comments/:id", commentController.updateComment);

export default router;
