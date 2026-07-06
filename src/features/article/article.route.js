import express from "express";
import setResource from "../../middleware/resource.middleware.js";
import validateId from "../../middleware/validate-id.middleware.js";
import upload from "../../middleware/upload.middleware.js";
import { requireAuth, optionalAuth } from "../../middleware/auth.middleware.js";
import * as articleController from "./article.controller.js";
import * as commentController from "../comment/comment.controller.js";
import * as favoriteController from "../favorite/favorite.controller.js";

const router = express.Router();

const MAX_IMAGE_COUNT = 3;

router.use(setResource("게시글"));

router.get("/", articleController.getArticles);
router.post(
  "/",
  requireAuth,
  upload.array("images", MAX_IMAGE_COUNT),
  articleController.createArticle,
);
router.get("/:id", validateId, optionalAuth, articleController.getArticle);
router.patch(
  "/:id",
  validateId,
  requireAuth,
  upload.array("images", MAX_IMAGE_COUNT),
  articleController.updateArticle,
);
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
router.delete(
  "/:id/favorite",
  validateId,
  requireAuth,
  favoriteController.removeFavorite,
);

export default router;
