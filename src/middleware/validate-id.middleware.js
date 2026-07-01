const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    const err = new Error("잘못된 ID 형식입니다");
    err.status = 400;
    return next(err);
  }

  req.params.id = Number(id);
  next();
};

export default validateId;
