const express = require("express");

// Express 앱 생성
const app = express();
const PORT = 3001;

const productRoutes = require("./routes/ProductRoutes");

app.use(express.json());

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log("서버 실행");
});
