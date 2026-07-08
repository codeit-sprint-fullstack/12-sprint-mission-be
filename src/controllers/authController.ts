import express, { NextFunction, Request, Response } from "express";
import { loginSchema, signupSchema } from "../schemas/auth.schema";
import validate from "../middlewares/validate";
import authService from "../services/authService";
import {
  authenticateToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../middlewares/auth";

const authController = express.Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? ("none" as const)
      : ("lax" as const),
};

authController.post(
  "/signup",
  validate(signupSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.signup(req.validatedData);
      return res
        .status(201)
        .json({ message: "회원가입이 완료되었습니다.", user });
    } catch (error) {
      next(error);
    }
  },
);

authController.post(
  "/login",
  validate(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.login(req.validatedData);
      res.cookie("refreshToken", result.refreshToken, cookieOptions);
      return res.status(200).json({
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  },
);

authController.post(
  "/refresh",
  verifyRefreshToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { newAccessToken, newRefreshToken } = await authService.refresh(
        req.auth.userId,
        req.cookies.refreshToken,
      );
      res.cookie("refreshToken", newRefreshToken, cookieOptions);
      return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      next(error);
    }
  },
);

authController.post(
  "/logout",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authService.logout(req.auth.userId);

      res.clearCookie("refreshToken", cookieOptions);
      return res.status(200).json({ message: "로그아웃 되었습니다." });
    } catch (error) {
      next(error);
    }
  },
);

authController.get(
  "/users/me",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.getMe(req.auth.userId);
      if (!user) {
        return res
          .status(401)
          .json({ message: "토큰에 유저 정보가 없습니다." });
      }

      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  },
);

export default authController;
