import express from "express";
import config from "./config/config.js";
import connectDB from "./db.js";

// MongoDB 연결
connectDB();

// Express 앱 생성
const app = express();
const PORT = config.server.port || 3000;

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
