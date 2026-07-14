import type { JwtPayload } from "jsonwebtoken";

export type AccessTokenPayload = JwtPayload & {
  userId: number;
  email?: string;
};

export type RefreshTokenPayload = JwtPayload & {
  userId: number;
};
