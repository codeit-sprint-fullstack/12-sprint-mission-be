import { RequestHandler } from "express";

const setResource =
  (name: string): RequestHandler =>
  (req, res, next) => {
    req.resource = name;
    next();
  };

export default setResource;
