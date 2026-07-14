import asyncHandler from "../../middleware/async-handler.middleware.js";
import * as userService from "./user.service.js";

export const getMe = asyncHandler(async (req, res) => {
  const user = await userService.getMe(req.user!.id);
  res.json({ data: user });
});
