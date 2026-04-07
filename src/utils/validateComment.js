export const validateCommentFields = ({ content }) => {
  if (!content || content.trim().length === 0 || content.length > 200) {
    const err = new Error("댓글 내용은 1~200자여야 합니다");
    err.status = 400;
    throw err;
  }
};
