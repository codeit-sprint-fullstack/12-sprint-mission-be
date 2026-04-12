import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import articleRoutes from "./routes/articleRoutes.js";
import articleCommentRoutes from "./routes/articleCommentRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import productCommentRoutes from "./routes/productCommentRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running" });
});

app.use("/articles", articleRoutes);
app.use("/articles", articleCommentRoutes);
app.use("/products", productRoutes);
app.use("/products", productCommentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
