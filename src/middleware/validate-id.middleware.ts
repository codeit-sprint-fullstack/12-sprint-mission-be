import { RequestHandler } from "express";
import { AppError } from "../types/error.js";

const validateId: RequestHandler = (req, res, next) => {
  const id = req.params.id;

  if (typeof id !== "string" || !/^\d+$/.test(id)) {
    return next(new AppError("잘못된 ID 형식입니다", 400));
  }

  next();
};

export default validateId;
