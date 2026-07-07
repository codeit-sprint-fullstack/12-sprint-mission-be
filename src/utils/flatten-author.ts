type WithAuthor = {
  author: {
    nickname: string;
  };
};

export const flattenAuthor = <T extends WithAuthor>({
  author,
  ...rest
}: T): Omit<T, "author"> & { authorNickname: string } => ({
  ...rest,
  authorNickname: author.nickname,
});
