import express from "express";
import setResource from "../../middleware/resource.middleware.js";
import validateId from "../../middleware/validate-id.middleware.js";
import { requireAuth, optionalAuth } from "../../middleware/auth.middleware.js";
import upload from "../../middleware/upload.middleware.js";
import * as productController from "./product.controller.js";
import * as commentController from "../comment/comment.controller.js";
import * as favoriteController from "../favorite/favorite.controller.js";
import { MAX_IMAGE_COUNT } from "../../constants/image.constants.js";

const router = express.Router();

router.use(setResource("상품"));

router.get("/", productController.getProducts);
router.post(
  "/",
  requireAuth,
  upload.array("images", MAX_IMAGE_COUNT),
  productController.createProduct,
);
router.get("/:id", validateId, optionalAuth, productController.getProduct);
router.patch(
  "/:id",
  validateId,
  requireAuth,
  upload.array("images", MAX_IMAGE_COUNT),
  productController.updateProduct,
);
router.delete("/:id", validateId, requireAuth, productController.deleteProduct);

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
