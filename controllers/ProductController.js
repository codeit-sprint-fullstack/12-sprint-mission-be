const Product = require("../models/Product");

//create
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;

    //DB create
    const product = await Product.create({ name, description, price, tags });

    return res.status(201).json({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "상품 등록 중 오류가 발생했습니다.",
    });
  }
};

// delete
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: "상품 삭제 중 오류가 발생했습니다.",
    });
  }
};

//getList
exports.getProductList = async (req, res) => {
  try {
    const { offset = 0, limit = 10, sort, search = "" } = req.query;

    const filtered = search
      ? {
          $or: [
            //대소문자 구분없이 이름이나 설명에서 찾아라(둘다니까 $or 안쓰면 and처럼 계산됨)
            { name: { $regex: search, $options: "i" } }, //regex는 정규식
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const products = await Product.find()
      .find(filtered)
      .sort({ createdAt: -1 }) //createdAt를 기준으로 -1 내림차순 정렬
      .skip(Number(offset))
      .limit(Number(limit));

    return res.status(200).json(
      products.map((product) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        createdAt: product.createdAt,
      })),
    );
  } catch (error) {
    return res.status(500).json({
      message: "목록 조회 중 오류가 발생했습니다.",
    });
  }
};

//getDetail
exports.getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }
    return res.status(200).json({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
    });
  } catch (error) {
    return res.status(500).json({
      message: "상품 상세 조회 중 오류가 발생했습니다.",
    });
  }
};

//patch
exports.patchProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, tags } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        tags,
      },
      {
        new: true,
        runValidators: true, //유효성 검사
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    return res.status(200).json({
      id: updatedProduct._id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      tags: updatedProduct.tags,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "수정 중 오류가 발생하였습니다.",
    });
  }
};
