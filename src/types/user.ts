import type { User } from "@prisma/client";

export type PublicUser = Pick<User, "id" | "email" | "nickname">;
