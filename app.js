import express from "express";
import cors from "cors";
import config from "./config/config.js";
import connectDB from "./db.js";
import productsRoutes from "./src/routes/productsRoutes.js";
import articlesRoutes from "./src/routes/articlesRoutes.js";
import authController from "./src/controllers/authController.js";

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

// 상품 API
app.use("/api/products", productsRoutes);
// 게시글 API
app.use("/api/articles", articlesRoutes);
// 인증 API
app.use("/api/auth", authController);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
