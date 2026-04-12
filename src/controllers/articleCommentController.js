import prisma from "../lib/prisma.js";

// 댓글 등록
export async function createArticleComment(req, res) {
  try {
    const articleId = Number(req.params.id);
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "content를 입력해주세요.",
      });
    }

    const comment = await prisma.articleComment.create({
      data: {
        content,
        articleId,
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "댓글 등록 실패" });
  }
}

// 댓글 목록 조회
export async function getArticleComments(req, res) {
  try {
    const articleId = Number(req.params.id);
    const { cursor, limit = 5 } = req.query;

    const comments = await prisma.articleComment.findMany({
      where: {
        articleId,
        ...(cursor && { id: { lt: Number(cursor) } }),
      },
      orderBy: { id: "desc" },
      take: Number(limit),
    });

    res.status(200).json({
      list: comments,
      nextCursor: comments.length ? comments[comments.length - 1].id : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "댓글 조회 실패" });
  }
}

export async function updateArticleComment(req, res) {
  try {
    const id = Number(req.params.id);
    const { content } = req.body;

    const comment = await prisma.articleComment.update({
      where: { id },
      data: { content },
    });

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "댓글 수정 실패" });
  }
}

export async function deleteArticleComment(req, res) {
  try {
    const id = Number(req.params.id);

    await prisma.articleComment.delete({
      where: { id },
    });

    res.status(200).json({ message: "삭제 완료" });
  } catch (error) {
    res.status(500).json({ message: "삭제 실패" });
  }
}
