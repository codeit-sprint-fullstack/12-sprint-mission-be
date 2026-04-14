import express from "express";
import {
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
  getArticles,
} from "../controllers/articleController.js";

const router = express.Router();

router.post("/", createArticle);
router.get("/", getArticles);
router.get("/:id", getArticleById);
router.patch("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;
