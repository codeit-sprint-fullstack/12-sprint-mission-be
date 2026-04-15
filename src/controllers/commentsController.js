import prisma from "../lib/prisma.js";

/* -------------------------
      게시글 댓글 API
----------------------------*/

// 게시글 댓글 작성
export const createArticleComment = async (req, res) => {
  try {
    const { content } = req.body;
    const id = parseInt(req.params.id);

    if (!content || content === "") {
      throw new Error("댓글 내용을 입력해주세요");
    }

    const newComment = await prisma.comment.create({
      data: {
        articleId: id,
        content,
      },
    });

    res.status(200).json({
      success: true,
      data: newComment,
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

// 게시글 댓글 목록 조회
export const getAllArticleComments = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cursorId = req.query.cursorId
      ? parseInt(req.query.cursorId)
      : undefined;
    const limit = parseInt(req.query.limit) || 10;

    const [comments, totalCount] = await Promise.all([
      prisma.comment.findMany({
        take: limit,
        skip: cursorId ? 1 : 0,
        ...(cursorId && {
          cursor: { id: cursorId },
        }),
        where: { articleId: id },
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      }),
      prisma.comment.count({
        where: { articleId: id },
      }),
    ]);

    const nextCursor =
      comments.length === limit ? comments[comments.length - 1].id : null;

    res.status(200).json({
      success: true,
      data: comments,
      totalCount,
      nextCursor,
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

/* -------------------------
      상품 댓글 API
----------------------------*/
// 상품 댓글 작성
export const createProductComment = async (req, res) => {
  try {
    const { content } = req.body;
    const id = parseInt(req.params.id);

    if (!content || content === "") {
      throw new Error("댓글 내용을 입력해주세요");
    }

    const newComment = await prisma.comment.create({
      data: {
        productId: id,
        content,
      },
    });

    res.status(200).json({
      success: true,
      data: newComment,
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

// 상품 댓글 목록 조회
export const getAllProductComments = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cursorId = req.query.cursorId
      ? parseInt(req.query.cursorId)
      : undefined;
    const limit = parseInt(req.query.limit) || 10;

    const [comments, totalCount] = await Promise.all([
      prisma.comment.findMany({
        take: limit,
        skip: cursorId ? 1 : 0,
        ...(cursorId && {
          cursor: { id: cursorId },
        }),
        where: { productId: id },
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      }),
      prisma.comment.count({
        where: { productId: id },
      }),
    ]);

    const nextCursor =
      comments.length === limit ? comments[comments.length - 1].id : null;

    res.status(200).json({
      success: true,
      data: comments,
      totalCount,
      nextCursor,
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

/* -------------------------
      공통 댓글 API
----------------------------*/

// 댓글 수정
export const updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const id = parseInt(req.query.comment);

    if (!content || content === "") {
      throw new Error("댓글 내용을 입력해주세요");
    }

    if (!id || id === "") {
      throw new Error("댓글을 찾을 수 없습니다");
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: {
        content,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedComment,
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

// 댓글 삭제
export const deleteComment = async (req, res) => {
  try {
    const id = parseInt(req.query.comment);

    const deletedComment = await prisma.comment.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      data: deletedComment,
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
