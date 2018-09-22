/**
 * @function idValidator
 */

const idValidator = (req, res, next) => {
/**
 * @description validates id parameter
 *
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @param {function} next - callback function
 *
 * @returns {Object} error response
 */

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
