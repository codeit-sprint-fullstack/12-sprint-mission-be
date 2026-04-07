import express from "express";
import setResource from "../middleware/setResource.js";
import validateId from "../middleware/validateId.js";
import * as articleController from "../controllers/articleController.js";

const router = express.Router();

router.use(setResource("게시글"));

router.post("/", articleController.createArticle);
router.get("/:id", validateId, articleController.getArticle);

export default router;
