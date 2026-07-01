import express from "express";
import setResource from "../../middleware/resource.middleware.js";
import validateId from "../../middleware/validate-id.middleware.js";
import * as articleController from "./article.controller.js";
import * as commentController from "../comment/comment.controller.js";

const router = express.Router();

router.use(setResource("게시글"));

router.get("/", articleController.getArticles);
router.post("/", articleController.createArticle);
router.get("/:id", validateId, articleController.getArticle);
router.patch("/:id", validateId, articleController.updateArticle);
router.delete("/:id", validateId, articleController.deleteArticle);

router.get("/:id/comments", validateId, commentController.getArticleComments);
router.post(
  "/:id/comments",
  validateId,
  commentController.createArticleComment,
);

export default router;
