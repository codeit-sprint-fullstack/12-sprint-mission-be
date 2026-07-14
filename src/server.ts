import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

import authRouter from "./features/auth/auth.route.js";
import productsRouter from "./features/product/product.route.js";
import articlesRouter from "./features/article/article.route.js";
import commentsRouter from "./features/comment/comment.route.js";
import usersRouter from "./features/user/user.route.js";

import errorHandler from "./middleware/error-handler.middleware.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/articles", articlesRouter);
app.use("/comments", commentsRouter);
app.use("/users", usersRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
