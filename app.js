import express from "express";
import cors from "cors";
import config from "./config/config.js";
import connectDB from "./db.js";
import productsRoutes from "./src/routes/productsRoutes.js";

// MongoDB 연결
// connectDB();

// Express 앱 생성
const app = express();
const PORT = config.server.port || 8080;
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://one2-sprint-mission-be-zfc3.onrender.com",
  ],
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/products", productsRoutes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
