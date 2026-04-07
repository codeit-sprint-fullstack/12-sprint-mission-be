import express from "express";
import Product from "../models/Subscription.js";

const router = express.Router();

// 상품 등록 API
router.post("/", async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;

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

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, tags } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (tags !== undefined) product.tags = tags;

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
      message: "상품 수정에 실패했습니다.",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    res.status(200).json({ message: "상품 삭제에 성공했습니다." });
  } catch (error) {
    res.status(500).json({
      message: "상품 수정에 실패했습니다.",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    let { offset, limit, orderBy, keyword } = req.query;

    offset = Number(offset);
    limit = Number(limit);

    let products = await Product.find();

    if (keyword) {
      products = products.filter((item) => {
        return (
          item.name.includes(keyword) || item.description.includes(keyword)
        );
      });
    }

    if (orderBy === "recent") {
      products.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    const totalCount = products.length;

    const list = products.slice(offset, offset + limit).map((item) => {
      return {
        id: item._id,
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
      };
    });

    res.status(200).json({
      list,
      totalCount,
      offset,
      limit,
    });
  } catch (error) {
    res.status(500).json({
      message: "상품 목록 조회에 실패했습니다.",
      error: error.message,
    });
  }
});

export default router;
