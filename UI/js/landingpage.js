const formModal = document.querySelector('.landingpage-modal'),
  formLogin = formModal.querySelector('#login-section'),
  formSignup = formModal.querySelector('#register-section'),
  formForgotPassword = formModal.querySelector('#forgot-password-section'),
  formModalTab = document.getElementsByClassName('switcher'),
  tabLogin = formModalTab[0].childNodes[1].getElementsByTagName('a'),
  tabSignup = formModalTab[0].childNodes[3].getElementsByTagName('a'),
  forgotPasswordLink = formLogin.querySelector('#forgot-password'),
  backToLoginLink = document.querySelector('#back-to-login'),
  inputFields = document.querySelectorAll('.input-field'),
  mainNav = document.querySelector('.menu a');

// login section is selected
const loginSelected = () => {
  formLogin.classList.add('is-selected');
  formSignup.classList.remove('is-selected');
  tabLogin[0].classList.add('selected');
  tabSignup[0].classList.remove('selected');
  formForgotPassword.classList.remove('is-selected');
};

// registration section is selected
const registrationSelected = () => {
  formLogin.classList.remove('is-selected');
  formSignup.classList.add('is-selected');
  tabLogin[0].classList.remove('selected');
  tabSignup[0].classList.add('selected');
  formForgotPassword.classList.remove('is-selected');
};

// show login section when navigation bar login/register button is clicked
mainNav.addEventListener('click', () => {
  formModal.classList.add('is-visible');
  loginSelected();
});


// close modal when you click on the background
formModal.addEventListener('click', (event) => {
  if (event.target.matches('.landingpage-modal')) {
    formModal.classList.remove('is-visible');
  }
});

// close modal when clicking the esc keyboard button
document.addEventListener('keyup', (event) => {
  if (event.which === 27 || event.code === 'Escape' || event.key === 'Escape') {
    formModal.classList.remove('is-visible');
  }
});

// check if input field has a value on blur

inputFields.forEach(inputField => inputField.addEventListener('blur', () => {
  this.inputField = inputField;
  if (this.inputField.value) {
    this.inputField.classList.add('used');
  } else {
    this.inputField.classList.remove('used');
  }
}));

// switch from a tab to another
formModalTab[0].addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.matches('.cd-login')) {
    loginSelected();
  } else {
    registrationSelected();
  }
});

const forgottenPasswordSelected = () => {
  formForgotPassword.classList.add('is-selected');
  formLogin.classList.remove('is-selected');
  formSignup.classList.remove('is-selected');
  formModalTab[0].classList.add('not-visible');
};

// show forgot password form
forgotPasswordLink.addEventListener('click', (event) => {
  event.preventDefault();
  forgottenPasswordSelected();
});


// back to login from the forgot-password-form
backToLoginLink.addEventListener('click', () => {
  formModalTab[0].classList.remove('not-visible');
  loginSelected();
});
