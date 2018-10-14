const loginEmail = document.getElementById('login-email'),
  emailSigninErrorMessage = document.getElementById('login-email-error'),
  loginPassword = document.getElementById('login-password'),
  passwordSigninErrorMessage = document.getElementById('login-password-error'),
  loginFormError = document.getElementById('login-form-error'),
  loginSpinner = document.getElementById('spinner'),
  loginButton = document.querySelector('#login-form-btn');

const loginErrors = {};


const loginEmailValidator = () => {
  if (!loginEmail.value.trim()) {
    loginErrors.email = 'Email is required';
    emailSigninErrorMessage.classList.add('is-visible');
    emailSigninErrorMessage.innerHTML = loginErrors.email;
    loginButton.disabled = true;
  } else if (loginEmail.value.trim() && (!(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/).test(loginEmail.value.trim()))) {
    loginErrors.email = 'Email is invalid';
    emailSigninErrorMessage.classList.add('is-visible');
    emailSigninErrorMessage.innerHTML = loginErrors.email;
    loginButton.disabled = true;
  } else {
    delete (loginErrors.email);
    emailSigninErrorMessage.classList.remove('is-visible');
    loginButton.disabled = false;
  }
};

const loginPasswordValidator = () => {
  if (!loginPassword.value.trim()) {
    loginErrors.password = 'Password is required';
    passwordSigninErrorMessage.classList.add('is-visible');
    passwordSigninErrorMessage.innerHTML = loginErrors.password;
    loginButton.disabled = true;
  } else if (loginPassword.value.trim() && loginPassword.value.trim().length < 8) {
    loginErrors.password = 'Password must contain between 8 - 20 characters';
    passwordSigninErrorMessage.classList.add('is-visible');
    passwordSigninErrorMessage.innerHTML = loginErrors.password;
    loginButton.disabled = true;
  } else if (loginPassword.value.trim() && loginPassword.value.trim().length > 20) {
    loginErrors.password = 'Password must contain between 8  - 20 characters';
    passwordSigninErrorMessage.classList.add('is-visible');
    passwordSigninErrorMessage.innerHTML = loginErrors.password;
    loginButton.disabled = true;
  } else {
    delete (loginErrors.password);
    passwordSigninErrorMessage.classList.remove('is-visible');
    loginButton.disabled = false;
  }
};

const onLoginEvent = (element, event) => {
  element.addEventListener(event, () => {
    if (event === 'blur' && element === loginEmail) {
      loginEmailValidator();
    }
    if (event === 'blur' && element === loginPassword) {
      loginPasswordValidator();
    }
    if (event === 'mouseenter' && element === loginButton) {
      loginEmailValidator();
      loginPasswordValidator();
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
  loginSpinner.classList.remove('hide');
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
      loginSpinner.classList.add('hide');
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
