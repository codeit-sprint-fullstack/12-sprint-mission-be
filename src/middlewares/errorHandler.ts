import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.code === "P2025" || err.status === 404) {
    return res
      .status(404)
      .json({ success: false, message: "Cannot find given id." });
  }

  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }

  const status = err.code ?? 500;

  console.error(err);
  res.status(status).json({
    path: req.path,
    method: req.method,
    message: err.message ?? "Internal Server Error",
    data: err.data ?? undefined,
    date: new Date(),
  });
};

export default errorHandler;
