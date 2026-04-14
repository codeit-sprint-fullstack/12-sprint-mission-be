import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import commentRouter from "./routes/productRoutes.js";
import articleRouter from "./routes/articleRouter.js";
import productRouter from "./routes/commentRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRouter);
app.use("/articles", articleRouter);
app.use("/comments", commentRouter);

app.listen(process.env.PORT, () => {
  console.log(`서버 실행 중: http://localhost:${process.env.PORT}`);
});
