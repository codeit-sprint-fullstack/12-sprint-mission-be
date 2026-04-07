import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productsRouter from "./routes/productRoutes.js";
import articlesRouter from "./routes/articleRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);
app.use("/articles", articlesRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
