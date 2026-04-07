import asyncHandler from "../middleware/asyncHandler.js";
import * as commentService from "../services/commentService.js";

export const updateComment = asyncHandler(async (req, res) => {
  const comment = await commentService.updateComment(req.params.id, req.body);
  res.json({ data: comment });
});

export const deleteComment = asyncHandler(async (req, res) => {
  await commentService.deleteComment(req.params.id);
  res.status(204).send();
});
