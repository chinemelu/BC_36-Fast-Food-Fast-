const firstName = document.getElementById('register-firstname'),
  firstNameErrorMessage = document.getElementById('register-firstname-error'),
  lastName = document.getElementById('register-lastname'),
  lastNameErrorMessage = document.getElementById('register-lastname-error'),
  email = document.getElementById('register-email'),
  emailErrorMessage = document.getElementById('register-email-error'),
  password = document.getElementById('register-password'),
  passwordErrorMessage = document.getElementById('register-password-error'),
  confirmPassword = document.getElementById('register-confirm-password'),
  confirmPasswordErrorMessage = document.getElementById('register-confirm-password-error'),
  signupButton = document.querySelector('#signup-form-btn');

// regex references
// https://stackoverflow.com/questions/20003870/how-do-i-create-regex-of-min-8-max-16-alphabetic-numbers-and-no-space
// https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
// https://stackoverflow.com/questions/9289451/regular-expression-for-alphabets-with-spaces

const errors = {};

const validateNameParameters = (parameter, errorMessage, placeholder) => {
  if (!parameter.value.trim()) {
    errors.parameter = `${placeholder} is required`;
    errorMessage.classList.add('is-visible');
    errorMessage.innerHTML = errors.parameter;
  } else if (parameter.value.trim() && !(/^[A-Za-z]*$/).test(parameter.value.trim())) {
    errors.parameter = `${placeholder} must consist of only alphabets
  and must contain no spaces between characters`;
    errorMessage.classList.add('is-visible');
    errorMessage.innerHTML = errors.parameter;
  } else if (parameter.value.trim() && parameter.value.trim().length > 50) {
    errors.parameter = `${placeholder} must be fewer than 50 characters`;
    errorMessage.classList.add('is-visible');
    errorMessage.innerHTML = errors.parameter;
    signupButton.disabled = true;
  } else {
    delete (errors.parameter);
    errorMessage.classList.remove('is-visible');
    signupButton.disabled = false;
  }
};

const onKeyDown = (parameter, errorMessage) => {
  parameter.addEventListener('keydown', () => {
    errorMessage.classList.remove('is-visible');
    signupButton.disabled = false;
  });
};

const emailValidator = () => {
  if (!email.value.trim()) {
    errors.email = 'Email is required';
    emailErrorMessage.classList.add('is-visible');
    emailErrorMessage.innerHTML = errors.email;
    signupButton.disabled = true;
  } else if (email.value.trim() && (!(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/).test(email.value.trim()))) {
    errors.email = 'Email is invalid';
    emailErrorMessage.classList.add('is-visible');
    emailErrorMessage.innerHTML = errors.email;
    signupButton.disabled = true;
  } else {
    delete (errors.email);
    emailErrorMessage.classList.remove('is-visible');
    signupButton.disabled = false;
  }
};

const passwordValidator = () => {
  if (!password.value.trim()) {
    errors.password = 'Password is required';
    passwordErrorMessage.classList.add('is-visible');
    passwordErrorMessage.innerHTML = errors.password;
    signupButton.disabled = true;
  } else if (password.value.trim() && password.value.trim().length < 8) {
    errors.password = 'Password must contain between 8 - 20 characters';
    passwordErrorMessage.classList.add('is-visible');
    passwordErrorMessage.innerHTML = errors.password;
    signupButton.disabled = true;
  } else if (password.value.trim() && password.value.trim().length > 20) {
    errors.password = 'Password must contain between 8  - 20 characters';
    passwordErrorMessage.classList.add('is-visible');
    passwordErrorMessage.innerHTML = errors.password;
    signupButton.disabled = true;
  } else {
    delete (errors.password);
    passwordErrorMessage.classList.remove('is-visible');
    signupButton.disabled = false;
  }
};

const confirmPasswordValidator = () => {
  if (!confirmPassword.value.trim()) {
    errors.confirmPassword = 'Re-enter password';
    confirmPasswordErrorMessage.classList.add('is-visible');
    confirmPasswordErrorMessage.innerHTML = errors.confirmPassword;
    signupButton.disabled = true;
  } else if (confirmPassword.value.trim()
   && confirmPassword.value.trim() !== password.value.trim()) {
    errors.confirmPassword = 'Passwords do not match';
    confirmPasswordErrorMessage.classList.add('is-visible');
    confirmPasswordErrorMessage.innerHTML = errors.confirmPassword;
    signupButton.disabled = true;
  } else {
    delete (errors.confirmPassword);
    confirmPasswordErrorMessage.classList.remove('is-visible');
    signupButton.disabled = false;
  }
};

const onEvent = (element, event) => {
  element.addEventListener(event, () => {
    if (event === 'blur' && element === firstName) {
      validateNameParameters(firstName, firstNameErrorMessage, 'First name');
    }
    if (event === 'blur' && element === lastName) {
      validateNameParameters(lastName, lastNameErrorMessage, 'Last name');
    }
    if (event === 'blur' && element === email) {
      emailValidator();
    }
    if (event === 'blur' && element === password) {
      passwordValidator();
    }
    if (event === 'blur' && element === confirmPassword) {
      confirmPasswordValidator();
    }
    if (event === 'mouseenter' && element === signupButton) {
      validateNameParameters(firstName, firstNameErrorMessage, 'First name');
      validateNameParameters(lastName, lastNameErrorMessage, 'Last name');
      emailValidator();
      passwordValidator();
      confirmPasswordValidator();
    }
    if (Object.keys(errors).length === 0) {
      signupButton.disabled = false;
    } else {
      signupButton.disabled = true;
    }
  });
};

onEvent(signupButton, 'mouseenter');
onEvent(firstName, 'blur');
onEvent(lastName, 'blur');
onEvent(email, 'blur');
onEvent(password, 'blur');
onEvent(confirmPassword, 'blur');
onKeyDown(firstName, firstNameErrorMessage);
onKeyDown(lastName, lastNameErrorMessage);
onKeyDown(email, emailErrorMessage);
onKeyDown(password, passwordErrorMessage);
onKeyDown(confirmPassword, confirmPasswordErrorMessage);


const registerUser = (e) => {
  e.preventDefault();
  const signupUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/auth/signup';
  const registrationDetails = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    reEnterPassword: confirmPassword.value
  };
  const fetchParameters = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(registrationDetails),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    }
  };
  fetch(signupUrl, fetchParameters)
    .then(res => res.json())
    .then((user) => {
      if (user.errors) {
        if (user.errors.emailExists) {
          emailErrorMessage.innerHTML = user.errors.emailExists;
          emailErrorMessage.classList.add('is-visible');
        }
      } else {
        window.localStorage.setItem('token', user.token);
        window.location.href = 'customerpage.html';
      }
    })
    .catch(error => error);
};

signupButton.addEventListener('click', registerUser);
