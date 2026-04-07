import prisma from "../lib/prisma";

// 게시글 생성
export const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || title === "") {
      throw new Error("게시글 제목을 입력해주세요");
    }
    if (!content || content === "") {
      throw new Error("게시글 내용을 입력해주세요");
    }

    const newArticle = await prisma.article.create({
      data: { title, content },
    });

    res.status(200).json({
      success: true,
      list: newArticle,
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

// 게시글 목록 전체 조회
export const getAllArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const orderBy = req.query.sort || "desc";
    const keyword = req.query.keyword || "";

    const skip = (page - 1) * pageSize;

    const [articles, totalCount] = await Promise.all([
      prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: keyword, mode: "insensitive" } },
            { content: { contains: keyword, mode: "insensitive" } },
          ],
        },
        skip,
        take: pageSize,
        orderBy: {
          createdAt: orderBy,
        },
      }),
      prisma.article.count(),
    ]);

    res.status(200).json({
      success: true,
      page,
      pageSize,
      orderBy,
      list: articles,
      totalPages: Math.ceil(totalCount / pageSize),
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

// 게시글 상세 조회
export const getArticle = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const article = await prisma.article.findUnique({
      where: { id },
    });

    res.status(200).json({
      success: true,
      data: article,
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

// 게시글 수정
export const updateArticle = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      data: updatedArticle,
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

// 게시글 삭제
export const deleteArticle = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedArticle = await prisma.article.delete({
      where: { id },
    });

    res.status(204).json({
      success: true,
      data: deletedArticle,
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
