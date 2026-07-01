export const validateAuthor = (resource, userId) => {
  if (resource.authorId !== userId) {
    const err = new Error("권한이 없습니다.");
    err.status = 403;
    throw err;
  }
};
