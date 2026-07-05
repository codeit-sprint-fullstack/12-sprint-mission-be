import { NextFunction, Request, Response } from "express";

function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    message: "Not found",
  });
}

export { notFoundHandler };
