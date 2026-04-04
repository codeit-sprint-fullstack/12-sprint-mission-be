const setResource = (name) => (req, res, next) => {
  req.resource = name;
  next();
};

export default setResource;
