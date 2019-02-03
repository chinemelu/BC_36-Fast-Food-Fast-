import db from '../models/db';

/**
 * @function doesUserExist
 */

const doesUserExist = (req, res, next) => {
  /**
   * @description checks if user from jwt token exists on application database
   *
   * @param {Object} req - http request
   * @param {Object} res - http response
   * @param {function} next - callback function
   *
   * @returns {Object} error response
   */

  const { userId } = req.decoded;
  const text = 'SELECT * FROM users WHERE id = $1';
  const params = [userId];

  db(text, params, (err, results) => {
    if (results.rows.length) {
      next();
    } else {
      return res.status(404).json({
        message: 'User does not exist',
        status: 404,
        success: false
      });
    }
  });
};
export default doesUserExist;
