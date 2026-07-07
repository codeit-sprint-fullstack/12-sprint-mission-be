import { AppError } from "../../types/error.js";

type SignupInput = {
  email?: string;
  nickname?: string;
  password?: string;
};

type LoginInput = {
  email?: string;
  password?: string;
};

export const validateSignup = ({
  email,
  nickname,
  password,
}: SignupInput): void => {
  if (!email || !nickname || !password) {
    throw new AppError("필수값이 누락되었습니다", 400);
  }

  if (password.length < 8) {
    throw new AppError("비밀번호는 8자 이상이어야 합니다", 400);
  }
};

export const validateLogin = ({ email, password }: LoginInput): void => {
  if (!email || !password) {
    throw new AppError("이메일과 비밀번호는 필수입니다", 400);
  }
};
