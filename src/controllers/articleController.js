import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 게시글 목록 조회
export const getArticleList = async (req, res) => {
  const { page = 1, pageSize = 10, keyword = "" } = req.query;
  const skip = (Number(page) - 1) * Number(pageSize);

  try {
    const articles = await prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: "insensitive" } },
          { content: { contains: keyword, mode: "insensitive" } },
        ],
      },
      skip,
      take: Number(pageSize),
      orderBy: { createdAt: "desc" },
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "게시글 목록 조회 실패" });
  }
};

// 게시글 상세 조회
export const getArticle = async (req, res) => {
  const { articleId } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: { id: Number(articleId) },
      include: {
        comments: {
          take: 5, // 5개만 로드
          orderBy: { createdAt: "desc" },
          select: { id: true, nickname: true, content: true, createdAt: true },
        },
      },
    });
    if (!article)
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: "조회 실패" });
  }
};

// 게시글 등록
export const createArticle = async (req, res) => {
  const { title, content, image } = req.body;
  try {
    const newArticle = await prisma.article.create({
      data: { title, content, image },
    });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ error: "게시글 등록 실패" });
  }
};

// 게시글 수정
export const patchArticle = async (req, res) => {
  const { articleId } = req.params;
  try {
    const updated = await prisma.article.update({
      where: { id: Number(articleId) },
      data: req.body,
    });
    res.json(updated);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }
    res.status(400).json({ error: "수정 실패" });
  }
};

// 게시글 삭제
export const deleteArticle = async (req, res) => {
  const { articleId } = req.params;
  try {
    await prisma.article.delete({ where: { id: Number(articleId) } });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }
    res.status(400).json({ error: "삭제 실패" });
  }
};
