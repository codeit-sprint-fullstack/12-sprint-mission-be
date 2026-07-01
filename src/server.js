import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./features/auth/auth.route.js";
import productsRouter from "./features/product/product.route.js";
import articlesRouter from "./features/article/article.route.js";
import commentsRouter from "./features/comment/comment.route.js";
import errorHandler from "./middleware/error-handler.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/articles", articlesRouter);
app.use("/comments", commentsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
