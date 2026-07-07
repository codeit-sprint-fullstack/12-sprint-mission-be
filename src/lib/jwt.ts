import jwt, { type JwtPayload } from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "./constants.js";

if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET이 설정되지 않았습니다");
}
if (!process.env.REFRESH_TOKEN_SECRET) {
  throw new Error("REFRESH_TOKEN_SECRET이 설정되지 않았습니다");
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const signAccessToken = (payload: string | object | Buffer): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

export const signRefreshToken = (payload: string | object | Buffer): string => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const verifyRefreshToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};
