const idValidator = (req, res, next) => {
  const { id } = req.params;
  const errors = {};

  if (!/^[0-9]*$/.test(id)) {
    errors.id = 'Invalid Id';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      errors
    });
  }
  next();
};

export default idValidator;
