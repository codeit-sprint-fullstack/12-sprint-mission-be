import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productsController.js";

const products = express.Router();

products.get("/", getAllProducts);

products.get("/:id", getProduct);

products.post("/", createProduct);

products.patch("/:id", updateProduct);

products.delete("/:id", deleteProduct);

export default products;
