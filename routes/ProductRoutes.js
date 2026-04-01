const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

// 상품 등록
router.post("/", productController.createProduct);
router.get("/", productController.getProductList);
router.get("/:id", productController.getProductDetail);
router.patch("/:id", productController.patchProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
