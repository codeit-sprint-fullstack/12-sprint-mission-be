import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./src/routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("판다마켓 API 실행중");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` port number : ${PORT}`);
});
