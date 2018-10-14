const navLogoutBtn = document.createElement('a');
navLogoutBtn.setAttribute('id', 'logout');
document.body.appendChild(navLogoutBtn);

document.addEventListener('click', (e) => {
  if (e.target.id === 'logout') {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = 'landingpage.html';
  }
});
