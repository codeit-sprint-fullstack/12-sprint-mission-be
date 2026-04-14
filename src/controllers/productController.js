import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Product 상품 조회
export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      keyword = "",
      orderBy = "recent",
    } = req.query;
    const skip = (Number(page) - 1) * Number(pageSize);

    const where = keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: "insensitive" } },
            { description: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};

    const order =
      orderBy === "favorite"
        ? { favoriteCount: "desc" }
        : { createdAt: "desc" };

    const [list, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: Number(pageSize),
        orderBy: order,
      }),
      prisma.product.count({ where }),
    ]);

    res.status(200).json({ list, totalCount });
  } catch (error) {
    res.status(500).json({ error: "목록 조회 실패" });
  }
};

// Product 상품 단일 조회
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product)
      return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "상세 조회 실패" });
  }
};

// Product 상품 등록
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, tags, images } = req.body;

    const numericPrice =
      price !== undefined && price !== null ? Number(price) : 0;

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: numericPrice,
        tags,
        images,
        favoriteCount: 0,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: "상품 등록 실패" });
  }
};

// Product 상품 수정
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.price !== undefined) {
      updateData.price = Number(updateData.price);
    }
    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: updateData,
    });
    res.status(200).json(updated);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    }
    res.status(400).json({ error: "상품 수정 실패" });
  }
};

// Product 상품 삭제
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    }
    res.status(400).json({ error: "상품 삭제 실패" });
  }
};
