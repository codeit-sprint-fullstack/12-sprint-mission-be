import bcrypt from "bcrypt";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../lib/jwt.js";
import * as authRepository from "./auth.repository.js";
import { validateSignup, validateLogin } from "./auth.validation.js";
import { AppError } from "../../types/error.js";
import type { RefreshTokenPayload } from "../../types/jwt.js";
import type { SignupInput, LoginInput } from "./auth.types.js";

export const signup = async ({ email, nickname, password }: SignupInput) => {
  validateSignup({ email, nickname, password });

  const exists = await authRepository.findByEmail(email);
  if (exists) {
    throw new AppError("이미 존재하는 이메일입니다", 409);
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await authRepository.createUser({
    email,
    nickname,
    encryptedPassword,
  });

  return {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
  };
};

export const login = async ({ email, password }: LoginInput) => {
  validateLogin({ email, password });

  const user = await authRepository.findByEmail(email);
  if (!user) {
    throw new AppError("이메일 또는 비밀번호가 올바르지 않습니다", 401);
  }

  const isMatch = await bcrypt.compare(password, user.encryptedPassword);
  if (!isMatch) {
    throw new AppError("이메일 또는 비밀번호가 올바르지 않습니다", 401);
  }

  const accessToken = signAccessToken({
    userId: user.id,
    email: user.email,
  });

  const refreshToken = signRefreshToken({ userId: user.id });

  await authRepository.saveRefreshToken(user.id, refreshToken);

  return {
    user: {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    },
    accessToken,
    refreshToken,
  };
};

export const refresh = async (refreshToken: string | undefined) => {
  if (!refreshToken) {
    throw new AppError("리프레시 토큰이 없습니다", 401);
  }

  let payload: RefreshTokenPayload;
  try {
    payload = verifyRefreshToken(refreshToken) as RefreshTokenPayload;
  } catch {
    throw new AppError("유효하지 않거나 만료된 리프레시 토큰입니다", 401);
  }

  const user = await authRepository.findById(payload.userId);

  // DB에 저장된 토큰과 일치하는지 확인 (탈취/재사용 방지)
  if (!user || user.refreshToken !== refreshToken) {
    throw new AppError("유효하지 않은 리프레시 토큰입니다", 401);
  }

  const newAccessToken = signAccessToken({
    userId: user.id,
    email: user.email,
  });

  return { accessToken: newAccessToken };
};

export const logout = async (userId: number): Promise<void> => {
  await authRepository.clearRefreshToken(userId);
};
