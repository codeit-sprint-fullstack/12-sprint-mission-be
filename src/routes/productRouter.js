import express from "express";
import Product from "../models/Subscription.js";

const router = express.Router();

// 상품 등록 API
router.post("/", async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;
    console.log("🔥 요청 들어옴:", req.body);
    const product = await Product.create({
      name,
      description,
      price,
      tags,
    });

    res.status(201).json({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "상품 등록에 실패했습니다.",
      error: error.message,
    });
  }
});

// 상품 상세 조회 API
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    res.status(200).json({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "상품 조회에 실패했습니다.",
      error: error.message,
    });
  }
});

export default router;
