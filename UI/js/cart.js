const token = localStorage.getItem('token'),
  myCartSpinner = document.querySelector('.spinner'),
  errorBannerMessage = document.querySelector('.cd-error-banner-message'),
  successMessage = document.querySelector('.cd-success-message');

const cartNav = document.createElement('a');
cartNav.className = 'cart-nav';
document.body.appendChild(cartNav);

const myCartHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  token
});

const cartHeader = {
  method: 'GET',
  mode: 'cors',
  headers: myCartHeaders
};

const getURLParameter = name => decodeURIComponent((new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`)
  .exec(window.location.search) || [null, ''])[1]
  .replace(/\+/g, '%20')) || null;

const successParams = getURLParameter('success');

const paramsMessage = (bool, otherMessage, message, innerMessage) => {
  if (successParams === `${bool}`) {
    otherMessage.innerHTML = '';
    otherMessage.classList.remove('is-visible');
    message.innerHTML = innerMessage;
    message.classList.add('is-visible');
  }
};
if (paramsMessage !== null && paramsMessage !== undefined) {
  paramsMessage('true', errorBannerMessage, successMessage, 'You have ordered successfully');
} else {
  successMessage.classList.remove('is-visible');
  errorBannerMessage.classList.remove('is-visible');
}

let cartView = `<h1 class="main-heading">Shopping Cart</h1>
<table><tr><th>Item</th><th>Price</th><th>Quantity</th></tr>`;

const getMyCartDetails = () => {
  myCartSpinner.classList.remove('hide');
  const getCartUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/cart';
  fetch(getCartUrl, cartHeader)
    .then(res => res.json())
    .then((cart) => {
      if (cart.cart.totalQuantity === 0) {
        document.querySelector('.no-items-text').innerHTML = 'There are no items in the cart';
      }
      myCartSpinner.classList.add('hide');
      cart.cart.items.map((item) => {
        cartView += `<tr>
      <td>
        <div class="image-details">
        <div class="image">
          <img src=${item.img_url}>
        </div>
        <div class="image-name">
        <h1>${item.name}</h1>
        <a href="#">Delete</a>
        </div>
        </div>
      </td>
      <td class="price-data">
        <h1>#${item.price}</h1>
      </td>
      <td class="quantity-data">
        <select id="cart-item-quantity">
        <option value=1>1</option>
        <option value=2>2</option>
        <option value=3>3</option>
        <option value=4>4</option>
        <option value=5>5</option>
        <option value=6>6</option>
        <option value=7>7</option>
        <option value=8>8</option>
        <option value=9>9</option>
        <option value=10+>10+</option>
        </select>
      </td>
    </tr>`;
        return cartView;
      });
      cartView += `</table>
        <div class="sub-total">
        <h1>Subtotal (${cart.cart.totalQuantity} items):  #${cart.cart.totalprice}</h1>
        <button class="proceed-btn">Proceed</button>
        </div>`;
      document.querySelector('.cart-entry').innerHTML = cartView;
    }).catch(error => error);
};

document.addEventListener('click', (e) => {
  if (e.target.className === 'cart-nav') {
    window.location.href = 'customercart.html';
  }
  if (e.target.className === 'proceed-btn') {
    window.location.href = 'deliverydetails.html';
  }
});

getMyCartDetails();
