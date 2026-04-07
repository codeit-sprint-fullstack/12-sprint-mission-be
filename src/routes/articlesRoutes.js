import express from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  updateArticle,
} from "../controllers/articlesController";

const router = express.Router();

router.get("/", getAllArticles);

router.get("/:id", getArticle);

router.post("/", createArticle);

router.patch("/:id", updateArticle);

router.delete("/:id", deleteArticle);

export default router;
