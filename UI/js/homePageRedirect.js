const token = localStorage.getItem('token');
const decodedToken = jwt_decode(token);

const dateNow = new Date();

if (decodedToken && decodedToken.exp > (dateNow.getTime() / 1000)) {
  window.location.href = 'customerpage.html';
}
