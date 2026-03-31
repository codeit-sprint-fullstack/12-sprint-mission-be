const express = require("express");

// Express 앱 생성
const app = express();
const PORT = 3001;

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello Express!");
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
