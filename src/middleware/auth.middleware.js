import { verifyAccessToken } from "../lib/jwt.js";

const requireAuth = (req, res, next) => {
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

export default requireAuth;
