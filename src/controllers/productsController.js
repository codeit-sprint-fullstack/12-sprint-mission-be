import prisma from "../lib/prisma.js";

// 상품 목록 전체 조회
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const orderBy = req.query.sort || "desc";
    const keyword = req.query.keyword || "";

    const skip = (page - 1) * pageSize;

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: keyword, mode: "insensitive" } },
            { description: { contains: keyword, mode: "insensitive" } },
          ],
        },
        skip,
        take: pageSize,
        orderBy: {
          createdAt: orderBy,
        },
      }),
      prisma.product.count(),
    ]);

    res.status(200).json({
      success: true,
      page,
      pageSize,
      orderBy,
      totalPages: Math.ceil(totalCount / pageSize),
      list: products,
      totalCount,
    });
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

// 상품 상세 조회
export const getProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    res.status(200).json({
      success: true,
      data: product,
    });
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

// 상품 생성
export const createProduct = async (req, res) => {
  try {
    const newProduct = await prisma.product.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      data: newProduct,
    });
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

// 상품 수정
export const updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
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

// 상품 삭제
export const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    res.status(204).json({
      success: true,
      data: deletedProduct,
    });
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
