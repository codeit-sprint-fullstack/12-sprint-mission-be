import prisma from "../lib/prisma.js";

// 댓글 등록
export async function createProductComment(req, res) {
  try {
    const productId = Number(req.params.id);
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "content를 입력해주세요.",
      });
    }

    const comment = await prisma.productComment.create({
      data: {
        content,
        productId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "댓글 등록 실패" });
  }
}

// 댓글 목록 (cursor)
export async function getProductComments(req, res) {
  try {
    const productId = Number(req.params.id);
    const { cursor, limit = 5 } = req.query;

    const comments = await prisma.productComment.findMany({
      where: {
        productId,
        ...(cursor && { id: { lt: Number(cursor) } }),
      },
      orderBy: { id: "desc" },
      take: Number(limit),
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      list: comments,
      nextCursor: comments.length ? comments[comments.length - 1].id : null,
    });
  } catch (error) {
    res.status(500).json({ message: "조회 실패" });
  }
}

// 수정
export async function updateProductComment(req, res) {
  try {
    const id = Number(req.params.id);
    const { content } = req.body;

    const comment = await prisma.productComment.update({
      where: { id },
      data: { content },
    });

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "수정 실패" });
  }
}

// 삭제
export async function deleteProductComment(req, res) {
  try {
    const id = Number(req.params.id);

    await prisma.productComment.delete({
      where: { id },
    });

    res.status(200).json({ message: "삭제 완료" });
  } catch (error) {
    res.status(500).json({ message: "삭제 실패" });
  }
}
