import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "상품명은 필수입니다."],
      minlength: [1, "상품명은 1자 이상이어야 합니다."],
      maxlength: [10, "상품명은 10자 이하여야 합니다."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "상품 소개는 필수입니다."],
      minlength: [10, "상품 소개는 10자 이상이어야 합니다."],
      maxlength: [100, "상품 소개는 100자 이하여야 합니다."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "가격은 필수입니다."],
      min: [0, "가격은 0 이상이어야 합니다."],
    },
    tags: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
