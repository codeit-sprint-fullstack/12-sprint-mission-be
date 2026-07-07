import express from "express";
import setResource from "../../middleware/resource.middleware.js";
import validateId from "../../middleware/validate-id.middleware.js";
import upload from "../../middleware/upload.middleware.js";
import { requireAuth, optionalAuth } from "../../middleware/auth.middleware.js";
import * as articleController from "./article.controller.js";
import * as commentController from "../comment/comment.controller.js";
import * as favoriteController from "../favorite/favorite.controller.js";
import { MAX_IMAGE_COUNT } from "../../constants/image.constants.js";

const router = express.Router();

router.use(setResource("게시글"));

router
  .route("/")
  .get(articleController.getArticles)
  .post(
    requireAuth,
    upload.array("images", MAX_IMAGE_COUNT),
    articleController.createArticle,
  );

router
  .route("/:id")
  .get(validateId, optionalAuth, articleController.getArticle)
  .patch(
    validateId,
    requireAuth,
    upload.array("images", MAX_IMAGE_COUNT),
    articleController.updateArticle,
  )
  .delete(validateId, requireAuth, articleController.deleteArticle);

router
  .route("/:id/comments")
  .get(validateId, commentController.getComments)
  .post(validateId, requireAuth, commentController.createComment);

router
  .route("/:id/favorite")
  .post(validateId, requireAuth, favoriteController.addFavorite)
  .delete(validateId, requireAuth, favoriteController.removeFavorite);

export default router;
