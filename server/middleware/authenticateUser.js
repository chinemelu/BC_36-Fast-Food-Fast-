
const authenticateUser = (req, res, next) => {
  const { userId } = req.decoded;
  const paramUserId = req.params.id;
  if (userId !== paramUserId) {
    return res.status(403).json({
      error: 'You are not authorised to perform this action'
    });
  }
  next();
};

export default authenticateUser;
