import trimField from '../helper/trimField';
import trimToLowerCaseField from '../helper/trimToLowerCaseField';

/**
 * @description Validator for login route
 *
 * @param {Object} req http request
 * @param {Object} res http response
 * @param {Function} next callback function
 *
 * @returns {Object}
 */

const loginValidator = (req, res, next) => {
  const errors = {};

  const email = trimToLowerCaseField(req.body, 'email');
  const password = trimField(req.body, 'password');

  if (!email) {
    errors.email = 'Email field is required';
  }
  if (!password) {
    errors.password = 'Password field is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

export default loginValidator;
