const token = localStorage.getItem('token');

const decodedAuthorisedToken = jwt_decode(token);

let isExpiredAuthorisedToken = false;

const date = new Date();

if (decodedAuthorisedToken && decodedAuthorisedToken.exp < (date.getTime() / 1000)) {
  isExpiredAuthorisedToken = true;
}

if (isExpiredAuthorisedToken === true) {
  localStorage.removeItem('token');
  window.location.href = 'customerpage.html';
}
