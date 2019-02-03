
const navbarToken = localStorage.getItem('token');
const decodedNavbarToken = jwt_decode(navbarToken);
const { role } = decodedNavbarToken;
const spinner = document.querySelector('.spinner');

const myHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  token: navbarToken
});

const getMenuHeader = {
  method: 'GET',
  mode: 'cors',
  headers: myHeaders
};

const getCartDetails = () => {
  spinner.classList.remove('hide');
  const getCartUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/cart';
  fetch(getCartUrl, getMenuHeader)
    .then(res => res.json())
    .then((cart) => {
      spinner.classList.add('hide');
      if (role === 'admin' || role === 'superadmin') {
        const navView = `<label id="hamburger" for="toggle">&#9776;</label>
      <input type="checkbox" id="toggle">
      <div class="menu">
        <a href="customerpage.html">Our Products</a>
        <a href="orderhistory.html">My Order History</a>
        <a href="adminpage.html" class="admin-nav">Admin</a></li>
        <a href="#" id="logout">Logout</a></li>
        <a class="cart-nav" href="customercart.html"><i class="fa fa-shopping-cart"></i><span class="total-cart-quantity">${cart.cart.cart.totalQuantity}</span></a>
        <a id="app-name" href="landingpage.html">Food-direct</a>
      </div>
        <p id="app-name-toggle" href="landingpage.html">Food-direct</p>`;
        document.querySelector('.nav').innerHTML = navView;
      }

      if (role === 'user') {
        const navView = `<label id="hamburger" for="toggle">&#9776;</label>
      <input type="checkbox" id="toggle">
      <div class="menu">
        <a href="customerpage.html">Our Products</a>
        <a href="orderhistory.html">My Order History</a>
        <a href="#" id="logout">Logout</a></li>
        <a class="cart-nav" href="customercart.html"><i class="fa fa-shopping-cart"></i><span class="total-cart-quantity">${cart.cart.cart.totalQuantity}</span></a>
        <a id="app-name" href="landingpage.html">Food-direct</a>
      </div>
        <p id="app-name-toggle" href="landingpage.html">Food-direct</p>`;
        document.querySelector('.nav').innerHTML = navView;
      }
    }).catch(error => error);
};

getCartDetails();
