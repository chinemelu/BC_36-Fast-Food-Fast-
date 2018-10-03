const loginEmail = document.getElementById('login-email'),
  emailSigninErrorMessage = document.getElementById('login-email-error'),
  loginPassword = document.getElementById('login-password'),
  passwordSigninErrorMessage = document.getElementById('login-password-error'),
  loginFormError = document.getElementById('login-form-error'),
  loginButton = document.querySelector('#login-form-btn');

const loginErrors = {};


const loginValidator = (parameter, errorMessage, placeholder) => {
  if (!parameter.value.trim()) {
    loginErrors.parameter = `${placeholder} is required`;
    errorMessage.classList.add('is-visible');
    errorMessage.innerHTML = loginErrors.parameter;
    loginButton.disabled = true;
  } else {
    delete (loginErrors.parameter);
    errorMessage.classList.remove('is-visible');
    loginButton.disabled = false;
  }
};

const onLoginEvent = (element, event) => {
  element.addEventListener(event, () => {
    if (event === 'blur' && element === loginEmail) {
      loginValidator(loginEmail, emailSigninErrorMessage, 'Email field');
    }
    if (event === 'blur' && element === loginPassword) {
      loginValidator(loginPassword, passwordSigninErrorMessage, 'Password field');
    }
    if (event === 'mouseenter' && element === loginButton) {
      loginValidator(loginEmail, emailSigninErrorMessage, 'Email field');
      loginValidator(loginPassword, passwordSigninErrorMessage, 'Password field');
    }
    if (Object.keys(loginErrors).length === 0) {
      loginButton.disabled = false;
    } else {
      loginButton.disabled = true;
    }
  });
};

const onLoginKeyDown = (parameter, errorMessage) => {
  parameter.addEventListener('keydown', () => {
    errorMessage.classList.remove('is-visible');
    loginFormError.classList.remove('is-visible');
    loginButton.disabled = false;
  });
};

onLoginKeyDown(loginEmail, emailSigninErrorMessage);
onLoginKeyDown(loginPassword, passwordSigninErrorMessage);
onLoginEvent(loginEmail, 'blur');
onLoginEvent(loginPassword, 'blur');
onLoginEvent(loginButton, 'mouseenter');


loginEmail.addEventListener('keypress', () => {
  emailSigninErrorMessage.classList.remove('is-visible');
});
loginPassword.addEventListener('keypress', () => {
  passwordSigninErrorMessage.classList.remove('is-visible');
});


const loginUser = (e) => {
  e.preventDefault();
  const loginUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/auth/login';
  const loginDetails = {
    email: loginEmail.value,
    password: loginPassword.value
  };
  const fetchParameters = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(loginDetails),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    }
  };

  fetch(loginUrl, fetchParameters)
    .then(res => res.json())
    .then((user) => {
      if (user.errors) {
        if (user.errors.password) {
          passwordSigninErrorMessage.innerHTML = user.errors.password;
          passwordSigninErrorMessage.classList.add('is-visible');
        }
        if (user.errors.email) {
          emailSigninErrorMessage.innerHTML = user.errors.email;
          emailSigninErrorMessage.classList.add('is-visible');
        }
      } else if (user.error) {
        loginFormError.innerHTML = user.error;
        loginFormError.classList.add('is-visible');
      } else {
        window.localStorage.setItem('token', user.token);
        window.location.href = 'customerpage.html';
      }
    })
    .catch(error => error);
};

loginButton.addEventListener('click', loginUser);
