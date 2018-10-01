import jwt from 'jsonwebtoken';

/**
 * @function authenticateToken
 */

const authenticateToken = (req, res, next) => {
  /**
   * @description checks if token is present and valid or invalid
   *
   * @param {Object} req - http request
   * @param {Object} res - http response
   * @param {function} next - callback function
   *
   * @returns {Object} error response
   */

  const { token } = req.headers;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: 'Invalid token',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: 'false',
      message: 'No token provided'
    });
  }
};

export default authenticateToken;
