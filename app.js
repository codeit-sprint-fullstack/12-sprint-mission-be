import express from "express";
import cors from "cors";
import config from "./config/config.js";
import connectDB from "./db.js";
import Product from "./models/Product.js";

// MongoDB 연결
connectDB();

// Express 앱 생성
const app = express();
const PORT = config.server.port || 3000;
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://one2-sprint-mission-be-zfc3.onrender.com",
  ],
};
app.use(cors(corsOptions));
app.use(express.json());

const asyncHandler = (handler) => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      if (error.name === "ValidationError") {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else if (error.name === "CastError") {
        res
          .status(404)
          .json({ success: false, message: "Cannot find given id." });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  };
};

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const orderBy = req.query.sort || "-createdAt";
  const keyword = req.query.keyword || "";

  const skip = (page - 1) * pageSize;
  const queryOption = {};

  if (keyword) {
    queryOption.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  const products = await Product.find(queryOption)
    .sort(orderBy)
    .limit(pageSize)
    .skip(skip);

  const total = await Product.countDocuments();

  res.status(200).json({
    success: true,
    page,
    pageSize,
    orderBy,
    totalPages: Math.ceil(total / pageSize),
    list: products,
    totalCount: total,
  });
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id).select("-__v");

  res.status(200).json({
    success: true,
    data: product,
  });
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  Object.keys(req.body).forEach((key) => {
    product[key] = req.body[key];
  });
  await product.save();

  res.status(200).json({
    success: true,
    data: product,
  });
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);

  res.status(204).json({
    success: true,
    data: product,
  });
};

// 상품 목록 조회 API
app.get("/api/products", asyncHandler(getAllProducts));

// 상품 상세 조회 API
app.get("/api/products/:id", asyncHandler(getProduct));

// 상품 등록 API
app.post("/api/products", asyncHandler(createProduct));

// 상품 수정 API
app.patch("/api/products/:id", asyncHandler(updateProduct));

// 상품 삭제 API
app.delete("/api/products/:id", asyncHandler(deleteProduct));

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
