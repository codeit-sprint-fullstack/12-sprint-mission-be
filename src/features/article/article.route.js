import express from "express";
import setResource from "../../middleware/resource.middleware.js";
import validateId from "../../middleware/validate-id.middleware.js";
import requireAuth from "../../middleware/auth.middleware.js";
import * as articleController from "./article.controller.js";
import * as commentController from "../comment/comment.controller.js";
import * as favoriteController from "../favorite/favorite.controller.js";

const router = express.Router();

router.use(setResource("게시글"));

router.get("/", articleController.getArticles);
router.post("/", requireAuth, articleController.createArticle);
router.get("/:id", validateId, requireAuth, articleController.getArticle);
router.patch("/:id", validateId, requireAuth, articleController.updateArticle);
router.delete("/:id", validateId, requireAuth, articleController.deleteArticle);

router.get("/:id/comments", validateId, commentController.getComments);
router.post(
  "/:id/comments",
  validateId,
  requireAuth,
  commentController.createComment,
);

router.post(
  "/:id/favorite",
  validateId,
  requireAuth,
  favoriteController.addFavorite,
);

export default router;
