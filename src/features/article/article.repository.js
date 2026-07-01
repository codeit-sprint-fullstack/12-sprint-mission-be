import prisma from "../../lib/prisma.js";

export const findMany = ({ where, orderBy, skip, take }) => {
  return prisma.article.findMany({
    where,
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy,
    skip,
    take,
  });
};

export const count = (where) => {
  return prisma.article.count({ where });
};

export const create = ({ title, content, authorId }) => {
  return prisma.article.create({
    data: {
      title,
      content,
      authorId,
    },
  });
};

export const findById = (id) => {
  return prisma.article.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const update = (id, data) => {
  return prisma.article.update({
    where: { id },
    data,
  });
};

export const remove = (id) => {
  return prisma.article.delete({
    where: { id },
  });
};
