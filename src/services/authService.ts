import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authRepository from "../repositories/authRepository";
import { User } from "@prisma/client";
import { AuthenticationError, ValidationError } from "../types/error";

const signup = async (
  signupData: Pick<User, "email" | "encryptedPassword" | "nickname">,
): Promise<
  Omit<User, "encryptedPassword" | "refreshToken" | "createdAt" | "updatedAt">
> => {
  const existingUser = await authRepository.findByEmail(signupData.email);
  if (existingUser) {
    throw new ValidationError("이미 가입된 이메일입니다.");
  }

  const hashedPassword = await hashPassword(signupData.encryptedPassword);
  const user = await authRepository.createUser({
    email: signupData.email,
    encryptedPassword: hashedPassword,
    nickname: signupData.nickname,
  });

  return user;
};

const login = async (
  loginData: Pick<User, "email" | "encryptedPassword">,
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const user = await authRepository.findByEmail(loginData.email);
  if (!user) {
    throw new ValidationError("이메일 또는 비밀번호가 올바르지 않습니다.");
  }

  const isMatch = await comparePassword(
    loginData.encryptedPassword,
    user.encryptedPassword,
  );
  if (!isMatch) {
    throw new AuthenticationError("이메일 또는 비밀번호가 올바르지 않습니다.");
  }

  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken({ userId: user.id });
  await authRepository.updateUser(user.id, {
    refreshToken,
  });

  return { accessToken, refreshToken };
};

const refresh = async (
  userId: User["id"],
  refreshToken: User["refreshToken"],
): Promise<{
  newAccessToken: string;
  newRefreshToken: string;
}> => {
  const user = await authRepository.findById(userId);

  if (!user || user.refreshToken !== refreshToken) {
    throw new AuthenticationError("유효하지 않은 토큰입니다.");
  }

  const newAccessToken = generateAccessToken({ userId });
  const newRefreshToken = generateRefreshToken({ userId });
  await authRepository.updateUser(userId, { refreshToken: newRefreshToken });

  return { newAccessToken, newRefreshToken };
};

const logout = async (userId: User["id"]): Promise<void> => {
  await authRepository.updateUser(userId, { refreshToken: null });
};

const getMe = async (
  userId: User["id"],
): Promise<Omit<User, "encryptedPassword" | "refreshToken">> => {
  const user = await authRepository.findById(userId);

  if (!user) {
    throw new Error("유저를 찾을 수 없습니다.");
  }

  // 비밀번호 등 민감한 정보 제외
  const { encryptedPassword, refreshToken, ...safeUserInfo } = user;

  return safeUserInfo;
};

const hashPassword = async (
  password: NonNullable<User["encryptedPassword"]>,
) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = async (inputPassword: string, hashPassword: string) => {
  return bcrypt.compare(inputPassword, hashPassword);
};

const generateAccessToken = (payload: { userId: User["id"] }): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "30m",
  });
};

const generateRefreshToken = (payload: { userId: User["id"] }): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "2w",
  });
};

const userProfileResponse = (user: User) => {
  return {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    image: user.image,
  };
};

const authService = {
  signup,
  login,
  refresh,
  logout,
  getMe,
};

export default authService;
