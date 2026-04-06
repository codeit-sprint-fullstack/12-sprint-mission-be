import Product from "../models/Product.js";

// 상품 등록
export async function createProduct(req, res) {
  try {
    const { name, description, price, tags, imageUrl } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      tags,
      imageUrl,
    });

    res.status(201).json({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "입력값이 올바르지 않습니다.",
        details: error.message,
      });
    }

    res.status(500).json({
      message: "상품 등록 중 오류가 발생했습니다.",
    });
  }
}

// 상품 목록 조회
export async function getProducts(req, res) {
  try {
    const {
      offset = 0,
      limit = 10,
      keyword = "",
      orderBy = "recent",
    } = req.query;

    const query = {};

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    const sortOption =
      orderBy === "recent" ? { createdAt: -1 } : { createdAt: -1 };

    const totalCount = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(Number(offset))
      .limit(Number(limit));

    const list = products.map((product) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      createdAt: product.createdAt,
    }));

    res.status(200).json({
      totalCount,
      list,
    });
  } catch (error) {
    res.status(500).json({
      message: "상품 목록 조회 실패",
    });
  }
}

// 상품 상세 조회
export async function getProductById(req, res) {
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
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "올바르지 않은 상품 id입니다.",
      });
    }

    res.status(500).json({
      message: "상품 조회 실패",
    });
  }
}

// 상품 수정
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, tags, imageUrl } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        tags,
        imageUrl,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    res.status(200).json({
      id: updatedProduct._id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      tags: updatedProduct.tags,
      createdAt: updatedProduct.createdAt,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "입력값이 올바르지 않습니다.",
        details: error.message,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "올바르지 않은 상품 id입니다.",
      });
    }

    res.status(500).json({
      message: "상품 수정 실패",
    });
  }
}

// 상품 삭제
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    res.status(200).json({
      message: "상품이 삭제되었습니다.",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "올바르지 않은 상품 id입니다.",
      });
    }

    res.status(500).json({
      message: "상품 삭제 실패",
    });
  }
}
