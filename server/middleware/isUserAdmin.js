/**
 * @function isUserAdmin
 */

const isUserAdmin = (req, res, next) => {
  /**
   * @description checks if user is admin
   *
   * @param {Object} req - http request
   * @param {Object} res - http response
   * @param {function} next - callback function
   *
   * @returns {Object} error response
   */

  const { role } = req.decoded;
  if (role !== 'superadmin' && role !== 'admin') {
    return res.status(403).json({
      message: 'You are not authorised to perform this action',
      status: 403,
      success: false
    });
  }
  next();
};

export default isUserAdmin;
