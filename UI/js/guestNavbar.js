const pageToken = localStorage.getItem('token');


const decodedToken = jwt_decode(pageToken);

let isExpiredToken = false;

const dateNow = new Date();

if (decodedToken && decodedToken.exp < (dateNow.getTime() / 1000)) {
  isExpiredToken = true;
}

if (!pageToken || isExpiredToken === true) {
  const getGuestMenuSpinner = document.querySelector('.spinner');

  const myGuestHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  });

  const getGuestMenuHeader = {
    method: 'GET',
    mode: 'cors',
    headers: myGuestHeaders
  };

  let guestMenuView = '<section id="food-list">';


  const getGuestMenuUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/menu';

  const getGuestMenu = () => {
    getGuestMenuSpinner.classList.remove('hide');
    fetch(getGuestMenuUrl, getGuestMenuHeader)
      .then(res => res.json())
      .then((foodItems) => {
        getGuestMenuSpinner.classList.add('hide');
        foodItems.data.map((foodItem) => {
          guestMenuView += `<div class="food-item">
            <img src=${foodItem.img_url}>
            <h1>${foodItem.name}</h1>
            <h3 id="listing-price">#${foodItem.price}</h3>
            <button class="add-to-cart" onclick = "addToCart('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/cart/add-to-cart/${foodItem.id}')">ADD TO CART</button>
            </div>
        `;
          return guestMenuView;
        });
        document.getElementById('get-menu-entry').innerHTML = guestMenuView;
      })
      .catch(error => error);
  };

  getGuestMenu();

  const getGuestCartDetails = () => {
    const navView = `<label id="hamburger" for="toggle">&#9776;</label>
      <input type="checkbox" id="toggle">
      <div class="menu">
        <a href="customerpage.html">Our Products</a>
        <a id="Login" href="#">Login/Register</a>
        <a class="cart-nav" href="customercart.html"><i class="fa fa-shopping-cart"></i><span class="total-cart-quantity hide"></span></a>
        <a id="app-name" href="landingpage.html">Food-direct</a>
      </div>
        <p id="app-name-toggle" href="landingpage.html">Food-direct</p>`;
    document.querySelector('.nav').innerHTML = navView;
    return navView;
  };

  getGuestCartDetails();
}
