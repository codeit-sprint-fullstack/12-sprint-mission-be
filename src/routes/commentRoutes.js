import express from "express";
import setResource from "../middleware/setResource.js";
import validateId from "../middleware/validateId.js";
import * as commentController from "../controllers/commentController.js";

const router = express.Router();

router.use(setResource("댓글"));

router.patch("/:id", validateId, commentController.updateComment);

export default router;
