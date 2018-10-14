const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'landingpage.html?user=false';
}

const decodedToken = jwt_decode(token);

let isExpiredToken = false;

const dateNow = new Date();

if (decodedToken && decodedToken.exp < (dateNow.getTime() / 1000)) {
  isExpiredToken = true;
}

if (isExpiredToken === true) {
  window.location.href = 'landingpage.html?user=false';
}
