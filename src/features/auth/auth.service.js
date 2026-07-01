import bcrypt from "bcrypt";
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
