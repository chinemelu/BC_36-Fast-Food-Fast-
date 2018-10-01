
/**
 * @function authenticateUser
 */

const authenticateUser = (req, res, next) => {
  /**
   * @description checks if user from params is the same as the user trying to access records
   *
   * @param {Object} req - http request
   * @param {Object} res - http response
   * @param {function} next - callback function
   *
   * @returns {Object} error response
   */

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
