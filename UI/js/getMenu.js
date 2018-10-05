const token = localStorage.getItem('token'),
  getMenuSpinner = document.getElementById('get-menu-spinner'),
  errorBannerMessage = document.querySelector('.cd-error-banner-message'),
  addToCartBtn = document.querySelector('.add-to-cart'),
  successMessage = document.querySelector('.cd-success-message');

const getURLParameter = name => decodeURIComponent((new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`)
  .exec(window.location.search) || [null, ''])[1]
  .replace(/\+/g, '%20')) || null;

const params = getURLParameter('admin');

const paramsMessage = (bool, otherMessage, message, innerMessage) => {
  if (params === `${bool}`) {
    otherMessage.innerHTML = '';
    otherMessage.classList.remove('is-visible');
    message.innerHTML = innerMessage;
    message.classList.add('is-visible');
  }
};
if (paramsMessage !== null && paramsMessage !== undefined) {
  paramsMessage('false', successMessage, errorBannerMessage, 'You are not authorised to perform this action');
} else {
  successMessage.classList.remove('is-visible');
  errorBannerMessage.classList.remove('is-visible');
}

const myHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  token
});

const getMenuHeader = {
  method: 'GET',
  mode: 'cors',
  headers: myHeaders
};


const getCartDetails = () => {
  getMenuSpinner.classList.remove('hide');
  const getCartUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/cart';
  fetch(getCartUrl, getMenuHeader)
    .then(res => res.json())
    .then((cart) => {
      getMenuSpinner.classList.add('hide');
      const navView = `<label id="hamburger" for="toggle">&#9776;</label>
      <input type="checkbox" id="toggle">
      <div class="menu">
        <a href="customerpage.html">Our Products</a>
        <a href="orderhistory.html">My Order History</a>
        <a href="adminpage.html">Admin</a></li>
        <a href="landingpage.html">Logout</a></li>
        <a href="customercart.html"><i class="fa fa-shopping-cart"></i><span class="total-cart-quantity">${cart.cart.totalQuantity}</span></a>
        <a id="app-name" href="landingpage.html">Food-direct</a>
      </div>
        <p id="app-name-toggle" href="landingpage.html">Food-direct</p>`;

      document.querySelector('.nav').innerHTML = navView;
    }).catch(error => error);
};

getCartDetails();

const addToCart = (url) => {
  fetch(url, getMenuHeader)
    .then(res => res.json())
    .then(() => {
      getCartDetails();
    }).catch((err) => {
      throw err;
    });
};

let menuView = '<section id="food-list">';


const getMenuUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/menu';

const getMenu = () => {
  fetch(getMenuUrl, getMenuHeader)
    .then(res => res.json())
    .then((foodItems) => {
      foodItems.data.map((foodItem) => {
        menuView += `<div class="food-item">
          <img src=${foodItem.img_url}>
          <h1>${foodItem.name}</h1>
          <h3 id="listing-price">#${foodItem.price}</h3>
          <button class="add-to-cart" onclick = "addToCart('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/cart/add-to-cart/${foodItem.id}')">ADD TO CART</button>
          </div>
       `;
        return menuView;
      });
      document.getElementById('get-menu-entry').innerHTML = menuView;
    })
    .catch(error => error);
};

getMenu();
