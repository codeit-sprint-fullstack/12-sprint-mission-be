import express from "express";
import { loginSchema, signupSchema } from "../schemas/auth.schema.js";
import validate from "../middlewares/validate.js";
import authService from "../services/authService.js";
import {
  authenticateToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../middlewares/auth.js";

const authController = express.Router();

authController.post(
  "/signup",
  validate(signupSchema),
  async (req, res, next) => {
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

authController.post("/login", validate(loginSchema), async (req, res, next) => {
  try {
    const result = await authService.login(req.validatedData);
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
    return res.status(200).json({
      accessToken: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
});

authController.post("/refresh", verifyRefreshToken, async (req, res, next) => {
  try {
    const { newAccessToken, newRefreshToken } = await authService.refresh(
      req.auth.userId,
      req.cookies.refreshToken,
    );
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
});

authController.post("/logout", verifyRefreshToken, async (req, res, next) => {
  try {
    await authService.logout(req.auth.userId);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
    return res.status(200).json({ message: "로그아웃 되었습니다." });
  } catch (error) {
    next(error);
  }
});

authController.get("/users/me", authenticateToken, async (req, res, next) => {
  try {
    const user = await authService.getMe(req.userId);
    if (!userId) {
      return res.status(401).json({ message: "토큰에 유저 정보가 없습니다." });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
});

export default authController;
