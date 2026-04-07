import prisma from "../lib/prisma.js";
import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const orderBy = req.query.sort || "desc";
    const keyword = req.query.keyword || "";

    const skip = (page - 1) * pageSize;
    // const queryOption = {};

    // if (keyword) {
    //   queryOption.$or = [
    //     { name: { $regex: keyword, $options: "i" } },
    //     { description: { $regex: keyword, $options: "i" } },
    //   ];
    // }

    // const products = await Product.find(queryOption)
    //   .sort(orderBy)
    //   .limit(pageSize)
    //   .skip(skip);

    // const total = await Product.countDocuments();

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
          createdAt: "desc",
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

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    // const product = await Product.findById(id).select("-__v");
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
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

export const createProduct = async (req, res) => {
  try {
    // const product = await Product.create(req.body);
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

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    // const product = await Product.findById(id);

    // Object.keys(req.body).forEach((key) => {
    //   product[key] = req.body[key];
    // });
    // await product.save();
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
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

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    // const product = await Product.findByIdAndDelete(id);
    const deletedProduct = await prisma.product.delete({
      where: { id: parseInt(id) },
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
