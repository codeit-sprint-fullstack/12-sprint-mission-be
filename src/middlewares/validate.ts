import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { ErrorAccumulator } from "../types/error";

const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = Object.values(
        result.error.issues.reduce<ErrorAccumulator>((acc, issue) => {
          const field = String(issue.path[0]);

          if (!acc[field]) {
            acc[field] = {
              field,
              message: issue.message,
            };
          }

          return acc;
        }, {}),
      );

      return res.status(400).json({
        message: "유효성 검사 실패",
        errors,
      });
    }

    req.validatedData = result.data;

    next();
  };
};

export default validate;
