import { RequestHandler } from "express";
import type { AppError } from "../types/error.js";

const validateId: RequestHandler = (req, res, next) => {
  const id = req.params.id;

  if (typeof id !== "string" || !/^\d+$/.test(id)) {
    const err: AppError = new Error("잘못된 ID 형식입니다");
    err.status = 400;
    return next(err);
  }

  next();
};

export default validateId;
