export const flattenAuthor = ({ author, ...rest }) => ({
  ...rest,
  authorNickname: author.nickname,
});
