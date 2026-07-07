import { RequestHandler } from "express";
import type { AccessTokenPayload } from "../types/jwt.js";
import { verifyAccessToken } from "../lib/jwt.js";
import { AppError } from "../types/error.js";

export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(new AppError("로그인이 필요합니다", 401));
  }

  try {
    const payload = verifyAccessToken(token) as AccessTokenPayload;

    req.user = {
      id: payload.userId,
    };

    next();
  } catch {
    next(new AppError("유효하지 않거나 만료된 토큰입니다", 401));
  }
};

export const optionalAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.accessToken;

  // 토큰이 없으면 비로그인 사용자로 간주
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const payload = verifyAccessToken(token) as AccessTokenPayload;

    req.user = {
      id: payload.userId,
    };
  } catch {
    // 토큰이 만료되거나 유효하지 않아도 에러를 내지 않음
    req.user = null;
  }

  next();
};
