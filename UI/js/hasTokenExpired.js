const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'landingpage.html?user=false';
}

const decodedAuthorisedToken = jwt_decode(token);

let isExpiredAuthorisedToken = false;

const date = new Date();

if (decodedAuthorisedToken && decodedAuthorisedToken.exp < (date.getTime() / 1000)) {
  isExpiredAuthorisedToken = true;
}

if (isExpiredAuthorisedToken === true) {
  localStorage.removeItem('token');
  window.location.href = 'landingpage.html?user=false';
}
