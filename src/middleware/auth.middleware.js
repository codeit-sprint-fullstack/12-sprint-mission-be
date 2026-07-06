import { verifyAccessToken } from "../lib/jwt.js";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    const err = new Error("로그인이 필요합니다");
    err.status = 401;
    return next(err);
  }

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.userId,
    };

    next();
  } catch {
    const err = new Error("유효하지 않거나 만료된 토큰입니다");
    err.status = 401;
    next(err);
  }
};

export const optionalAuth = (req, res, next) => {
  const token = req.cookies.accessToken;

  // 토큰이 없으면 비로그인 사용자로 간주
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.userId,
    };
  } catch {
    // 토큰이 만료되거나 유효하지 않아도 에러를 내지 않음
    req.user = null;
  }

  next();
};
