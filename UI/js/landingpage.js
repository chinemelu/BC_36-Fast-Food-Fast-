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
  mainNav = document.querySelector('#Login');

const addClassToClassList = (element, className) => {
  element.classList.add(className);
};

const removeClassFromClassList = (element, className) => {
  element.classList.remove(className);
};

// login section is selected
const loginSelected = () => {
  addClassToClassList(formLogin, 'is-selected');
  removeClassFromClassList(formSignup, 'is-selected');
  addClassToClassList(tabLogin[0], 'selected');
  removeClassFromClassList(tabSignup[0], 'selected');
  removeClassFromClassList(formForgotPassword, 'is-selected');
};

// registration section is selected
const registrationSelected = () => {
  removeClassFromClassList(formLogin, 'is-selected');
  addClassToClassList(formSignup, 'is-selected');
  removeClassFromClassList(tabLogin[0], 'selected');
  addClassToClassList(tabSignup[0], 'selected');
  removeClassFromClassList(formForgotPassword, 'is-selected');
};

// show login section when navigation bar login/register button is clicked
mainNav.addEventListener('click', () => {
  formModal.classList.add('is-visible');
  loginSelected();
});


// close modal when you click on the background
formModal.addEventListener('click', (event) => {
  if (event.target.matches('.landingpage-modal')) {
    removeClassFromClassList(formModal, 'is-visible');
  }
});

// close modal when clicking the esc keyboard button
document.addEventListener('keyup', (event) => {
  if (event.which === 27 || event.code === 'Escape' || event.key === 'Escape') {
    removeClassFromClassList(formModal, 'is-visible');
  }
});

// check if input field has a value on blur

inputFields.forEach(inputField => inputField.addEventListener('blur', () => {
  this.inputField = inputField;
  if (this.inputField.value) {
    addClassToClassList(this.inputField, 'used');
  } else {
    removeClassFromClassList(this.inputField, 'used');
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
  addClassToClassList(formForgotPassword, 'is-selected');
  removeClassFromClassList(formLogin, 'is-selected');
  removeClassFromClassList(formSignup, 'is-selected');
  addClassToClassList(formModalTab[0], 'not-visible');
};

// show forgot password form
forgotPasswordLink.addEventListener('click', (event) => {
  event.preventDefault();
  forgottenPasswordSelected();
});


// back to login from the forgot-password-form
backToLoginLink.addEventListener('click', () => {
  removeClassFromClassList(formModalTab[0], 'not-visible');
  loginSelected();
});
