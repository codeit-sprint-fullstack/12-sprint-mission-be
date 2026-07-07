import db from "../../lib/prisma.js";
import type { PublicUser } from "../../types/user.js";

export const findById = (id: number): Promise<PublicUser> => {
  return db.user.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      email: true,
      nickname: true,
    },
  });
};
