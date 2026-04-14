import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 댓글 목록 조회
export const getComments = async (req, res) => {
  const { articleId } = req.params;
  const { cursor, limit = 10 } = req.query;

  try {
    const comments = await prisma.articleComment.findMany({
      where: { articleId: Number(articleId) },
      take: Number(limit),
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: Number(cursor) } : undefined,
      select: {
        id: true,
        nickname: true,
        content: true,
        createdAt: true,
      },
      orderBy: { id: "desc" },
    });

    const nextCursor =
      comments.length > 0 ? comments[comments.length - 1].id : null;

    res.json({
      list: comments,
      nextCursor,
    });
  } catch (error) {
    res.status(500).json({ error: "댓글 조회 실패" });
  }
};

// 댓글 등록
export const createComment = async (req, res) => {
  const { articleId } = req.params;
  const { nickname, content } = req.body;
  try {
    const comment = await prisma.articleComment.create({
      data: {
        nickname,
        content,
        articleId: Number(articleId),
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: "댓글 등록 실패" });
  }
};

// 댓글 수정
export const patchComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  try {
    const updated = await prisma.articleComment.update({
      where: { id: Number(commentId) },
      data: { content },
    });
    res.json(updated);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "댓글을 찾을 수 없습니다." });
    }
    res.status(400).json({ error: "댓글 수정 실패" });
  }
};

// 댓글 삭제
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    await prisma.articleComment.delete({ where: { id: Number(commentId) } });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "댓글을 찾을 수 없습니다." });
    }
    res.status(400).json({ error: "댓글 삭제 실패" });
  }
};
