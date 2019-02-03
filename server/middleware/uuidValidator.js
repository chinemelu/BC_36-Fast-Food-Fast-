/**
 * @function uuidValidator
 */

const uuidValidator = (req, res, next) => {
  /**
   * @description validates id parameter
   *
   * @param {Object} req - http request
   * @param {Object} res - http response
   * @param {function} next - callback function
   *
   * @returns {Object} error response
   */

  // uuid regex reference https://stackoverflow.com/questions/136505/searching-for-uuids-in-text-with-regex

  const { id } = req.params;
  const errors = {};

  if (!/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(id)) {
    errors.id = 'Invalid Id';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      errors,
      status: 400,
      success: false
    });
  }
  next();
};

export default uuidValidator;
