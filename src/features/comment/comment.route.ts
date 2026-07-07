import express from "express";
import setResource from "../../middleware/resource.middleware.js";
import validateId from "../../middleware/validate-id.middleware.js";
import { requireAuth } from "../../middleware/auth.middleware.js";
import * as commentController from "./comment.controller.js";

const router = express.Router();

router.use(setResource("댓글"));

router
  .route("/:id")
  .patch(validateId, requireAuth, commentController.updateComment)
  .delete(validateId, requireAuth, commentController.deleteComment);

export default router;
