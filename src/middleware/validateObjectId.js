const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    const err = new Error("잘못된 ID 형식입니다");
    err.status = 400;
    return next(err);
  }

  next();
};

export default validateObjectId;
