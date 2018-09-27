import trimToLowerCaseField from '../helper/trimToLowerCaseField';
import trimField from '../helper/trimField';
import firstWordToCaps from '../helper/firstWordToCaps';

/**
 * @function addToMenuValidator
 */

const addToMenuValidator = (req, res, next) => {
  /**
 *@description validates add to menu form
 *
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @param {function} next - callback function
 *
 * @returns {Object} error response
 */

  // regex image url reference https://stackoverflow.com/questions/9714525/javascript-image-url-verify
  // regex price reference https://stackoverflow.com/questions/9011524/regex-to-check-whether-a-string-contains-only-numbers
  // alphabet regex validation reference https://stackoverflow.com/questions/8059370/javascript-regex-for-alphabetic-characters-and-spaces

  const errors = {};

  req.body.name = trimToLowerCaseField(req.body, 'name');
  req.body.name = firstWordToCaps(req.body.name);

  const price = trimField(req.body, 'price');

  const imgUrl = trimField(req.body, 'imgUrl');

  if (!req.body.name) {
    errors.name = 'Name field is required';
  }

  if (req.body.name && !/^[a-zA-Z ]+$/.test(req.body.name)) {
    errors.name = 'Name field must consist of only alphabets';
  }

  if (!price) {
    errors.price = 'Price field is required';
  }

  if (price && !/^-?\d+\.?\d*$/.test(price)) {
    errors.price = 'Please enter a valid price';
  }

  if (!imgUrl) {
    errors.imgUrl = 'Image url is required';
  }

  if (imgUrl && !/\.(jpeg|jpg|gif|png)($|\?)/.test(imgUrl)) {
    errors.imgUrl = 'Please enter a valid image file';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

export default addToMenuValidator;
