import asyncHandler from "../../middleware/async-handler.middleware.js";
import * as authService from "./auth.service.js";

export const signup = asyncHandler(async (req, res) => {
  const user = await authService.signup(req.body);

  res.status(201).json({ data: user });
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  res.status.json({ data: result });
});
