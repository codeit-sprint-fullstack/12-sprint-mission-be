import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productsRouter from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
