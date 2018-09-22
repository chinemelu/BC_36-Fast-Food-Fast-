import trimField from '../helper/trimField';
import trimToLowerCaseField from '../helper/trimToLowerCaseField';

const signupValidator = (req, res, next) => {
  const errors = {};
  const request = req.body;

  // regex references
  // https://stackoverflow.com/questions/20003870/how-do-i-create-regex-of-min-8-max-16-alphabetic-numbers-and-no-space
  // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
  // https://stackoverflow.com/questions/9289451/regular-expression-for-alphabets-with-spaces

  request.firstName = trimToLowerCaseField(request, 'firstName');
  request.firstName = `${request.firstName.charAt(0).toUpperCase()}${request.firstName.slice(1)}`;
  request.lastName = trimToLowerCaseField(request, 'lastName');
  request.lastName = `${request.lastName.charAt(0).toUpperCase()}${request.lastName.slice(1)}`;
  request.email = trimToLowerCaseField(request, 'email');
  request.password = trimField(request, 'password');
  request.reEnterPassword = trimField(request, 'reEnterPassword');

  if (!request.firstName) {
    errors.firstName = 'First name field must not be empty';
  }

  if (request.firstName && !/^[A-Za-z]*$/.test(request.firstName)) {
    errors.firstName = 'First name must consist of only alphabets \n'
      + 'and must contain no spaces between characters';
  }

  if (request.firstName && request.firstName.length > 50) {
    errors.username = 'First name must be fewer than 50 characters';
  }

  if (!request.lastName) {
    errors.lastName = 'Last name field must not be empty';
  }

  if (request.lastName && !/^[A-Za-z]*$/.test(request.lastName)) {
    errors.username = 'Last name must consist of only alphabets\n'
      + 'and must contain no spaces between characters';
  }

  if (request.lastName && request.lastName.length > 50) {
    errors.username = 'Last name must be fewer than 50 characters';
  }

  if (!request.email) {
    errors.email = 'Email field must not be empty';
  }

  if (request.email && !/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(request.email)) {
    errors.email = 'The email you entered is invalid';
  }


  if (!request.password) {
    errors.password = 'Password field must not be empty';
  }

  if (request.password && !/^.{8,20}$/.test(request.password)) {
    errors.password = 'Password must be between 8 - 20 characters';
  }

  if (!request.reEnterPassword) {
    errors.reEnterPassword = 'Re-enter password';
  }

  if (request.reEnterPassword && request.reEnterPassword !== request.password) {
    errors.reEnterPassword = 'Passwords do not match';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
  next();
};

export default signupValidator;
