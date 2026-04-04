import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// 상품 등록
app.post("/products", async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price, tags },
    });
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ message: "상품 등록 실패", error: e.message });
  }
});

// 상품 상세 조회
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product)
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    res.json(product);
  } catch (e) {
    res.status(500).json({ message: "조회 실패", error: e.message });
  }
});

// 상품 수정
app.patch("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const product = await prisma.product.update({ where: { id }, data });
    res.json(product);
  } catch (e) {
    res.status(500).json({ message: "수정 실패", error: e.message });
  }
});

// 상품 삭제
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ message: "삭제 실패", error: e.message });
  }
});

// 상품 목록 조회 (페이지네이션, 최신순, 검색)
app.get("/products", async (req, res) => {
  try {
    const { offset = 0, limit = 10, search = "" } = req.query;
    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
          ],
        }
      : {};
    const products = await prisma.product.findMany({
      where,
      skip: parseInt(offset),
      take: parseInt(limit),
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, price: true, createdAt: true },
    });
    res.json(products);
  } catch (e) {
    res.status(500).json({ message: "목록 조회 실패", error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
