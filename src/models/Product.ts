import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "상품명을 작성해주세요"],
      trim: true,
      minlength: [2, "2자 이상 입력해주세요"],
      maxlength: [10, "10자 이내로 입력해주세요"],
    },
    description: {
      type: String,
      required: [true, "상품 소개를 작성해주세요"],
      trim: true,
      minlength: [10, "10자 이상 입력해주세요"],
      maxlength: [100, "100자 이내로 입력해주세요"],
    },
    price: {
      type: Number,
      required: [true, "판매 가격을 입력해주세요"],
      trim: true,
      min: [0, "가격은 0 이상이어야 합니다"],
    },
    tags: {
      type: [String],
      required: [true, "태그를 작성해주세요"],
      trim: true,
      minlength: [1, "1글자 이상 입력해주세요"],
      maxlength: [5, "5글자 이내로 입력해주세요"],
      default: [],
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
    ownerId: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
