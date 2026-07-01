import express from "express";
import setResource from "../../middleware/resource.middleware.js";
import validateId from "../../middleware/validate-id.middleware.js";
import requireAuth from "../../middleware/auth.middleware.js";
import * as productController from "./product.controller.js";
import * as commentController from "../comment/comment.controller.js";
import * as favoriteController from "../favorite/favorite.controller.js";

const router = express.Router();

router.use(setResource("상품"));

router.get("/", productController.getProducts);
router.post("/", requireAuth, productController.createProduct);
router.get("/:id", validateId, requireAuth, productController.getProduct);
router.patch("/:id", validateId, requireAuth, productController.updateProduct);
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

export default router;
