const isAdminToken = localStorage.getItem('token');

if (!isAdminToken) {
  window.location.href = 'customerpage.html?admin=false';
} else {
  const decodedToken = jwt_decode(isAdminToken);

  if (decodedToken.role !== 'superadmin' && decodedToken.role !== 'admin') {
    window.location.href = 'customerpage.html?admin=false';
  }
}
