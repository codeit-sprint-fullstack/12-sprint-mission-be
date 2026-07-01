import bcrypt from "bcrypt";
import { signAccessToken } from "../../lib/jwt.js";
import * as authRepository from "./auth.repository.js";
import { validateSignup } from "./auth.validation.js";

export const signup = async ({ email, nickname, password }) => {
  validateSignup({ email, nickname, password });

  const exists = await authRepository.findByEmail(email);
  if (exists) {
    const err = new Error("이미 존재하는 이메일입니다");
    err.status = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authRepository.createUser({
    email,
    nickname,
    password: hashedPassword,
  });

  return {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    createdAt: user.createdAt,
  };
};

export const login = async ({ email, password }) => {
  validateSignup({ email, password });

  const user = await userRepository.findByEmail(email);
  if (!user) {
    const err = new Error("이메일 또는 비밀번호가 올바르지 않습니다");
    err.status = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("이메일 또는 비밀번호가 올바르지 않습니다");
    err.status = 401;
    throw err;
  }

  const accessToken = signAccessToken({
    userId: user.id,
    email: user.email,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    },
    accessToken,
  };
};
