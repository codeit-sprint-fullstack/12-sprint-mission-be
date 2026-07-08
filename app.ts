import express from "express";
import cors from "cors";
import config from "./config/config";
import connectDB from "./db.js";
import productsRoutes from "./src/routes/productsRoutes";
import articlesRoutes from "./src/routes/articlesRoutes";
import authController from "./src/controllers/authController";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middlewares/errorHandler";
import { notFoundHandler } from "./src/middlewares/notFoundHandler";

// MongoDB 연결
// connectDB();

// Express 앱 생성
const app = express();
const PORT = config.server.port || 8080;
// const corsOptions = {
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:3000",
//     "https://one2-sprint-mission-be-zfc3.onrender.com",
//   ],
// };
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// 상품 API
app.use("/api/products", productsRoutes);
// 게시글 API
app.use("/api/articles", articlesRoutes);
// 인증 API
app.use("/api/auth", authController);

// 404 처리
app.use(notFoundHandler);
// 에러 처리 미들웨어
app.use(errorHandler);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
