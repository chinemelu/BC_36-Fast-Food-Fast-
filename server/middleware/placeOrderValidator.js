import trimField from '../helper/trimField';

/**
 * @function placeOrderValidator
 */

const placeOrderValidator = (req, res, next) => {
  /**
 *@description validates order form
 *
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @param {function} next - callback function
 *
 * @returns {Object} error response
 */

  // regex reference https://www.w3resource.com/javascript/form/phone-no-validation.php
  const errors = {};

  const address = trimField(req.body, 'address');
  const mobileNumber = trimField(req.body, 'mobileNumber');

  if (!address) {
    errors.address = 'Address is required';
  }

  if (mobileNumber && !/^\d{11}$/.test(mobileNumber)) {
    errors.mobileNumber = 'Phone number must be 11 digits';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

export default placeOrderValidator;
