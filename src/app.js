import express from "express";

// Express 앱 생성
const app = express();

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello Express!");
});

export default app;
