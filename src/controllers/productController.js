import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product)
      return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "상세 조회 실패" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, tags, images } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
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

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.price) updateData.price = Number(updateData.price);

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: "상품 수정 실패" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "상품 삭제 실패" });
  }
};
