import asyncHandler from "../middleware/asyncHandler.js";
import * as commentService from "../services/commentService.js";

export const updateComment = asyncHandler(async (req, res) => {
  const comment = await commentService.updateComment(req.params.id, req.body);
  res.json({ data: comment });
});
