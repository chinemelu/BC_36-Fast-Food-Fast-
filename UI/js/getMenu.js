const errorBannerMessage = document.querySelector('.cd-error-banner-message'),
  successMessage = document.querySelector('.cd-success-message');


const getMenuURLParameter = name => decodeURIComponent((new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`)
  .exec(window.location.search) || [null, ''])[1]
  .replace(/\+/g, '%20')) || null;

const params = getMenuURLParameter('admin');

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

const myGetMenuHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  token: pageToken
});

const myGetMenuHeader = {
  method: 'GET',
  mode: 'cors',
  headers: myGetMenuHeaders
};

const addToCart = (url) => {
  fetch(url, myGetMenuHeader)
    .then(res => res.json())
    .then(() => {
      getCartDetails();
    }).catch((err) => {
      throw err;
    });
};

const getMenuUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/menu';

let menuView = '<section id="food-list">';

const getMenu = () => {
  fetch(getMenuUrl, myGetMenuHeader)
    .then(res => res.json())
    .then((foodItems) => {
      foodItems.data.map((foodItem) => {
        menuView += `<div class="food-item">
          <img src=${foodItem.img_url}>
          <h1>${foodItem.name}</h1>
          <h3 id="listing-price">#${foodItem.price}</h3>
          <button class="add-to-cart" onclick ="addToCart('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/cart/add-to-cart/${foodItem.id}')">ADD TO CART</button>
          </div>
        `;
        return menuView;
      });
      document.getElementById('get-menu-entry').innerHTML = menuView;
    })
    .catch(error => error);
};
getMenu();
