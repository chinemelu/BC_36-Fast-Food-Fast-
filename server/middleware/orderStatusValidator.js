import trimToLowerCaseField from '../helper/trimToLowerCaseField';

/**
 * @function orderStatusValidator
 */

const orderStatusValidator = (req, res, next) => {
  /**
 *@description validates prder status
 *
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @param {function} next - callback function
 *
 * @returns {Object} error response
 */

  const errors = {};

  const orderStatus = trimToLowerCaseField(req.body, 'orderStatus');

  if (!orderStatus) {
    errors.orderStatus = 'Order status is required';
  }

  if (orderStatus && orderStatus !== 'new' && orderStatus !== 'processing'
  && orderStatus !== 'cancelled' && orderStatus !== 'complete') {
    errors.orderStatus = "Order status can either be 'new', 'processing', cancelled' or 'complete'";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors, status: 400, success: false });
  }
  next();
};

export default orderStatusValidator;
