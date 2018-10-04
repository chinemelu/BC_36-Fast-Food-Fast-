
const token = localStorage.getItem('token');
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
          <button class="add-to-cart" onclick = "getRideRequest('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/cart/add-to-cart/${foodItem.id}')">ADD TO CART</button>
          </div>
       `;
        return menuView;
      });
      document.getElementById('get-menu-entry').innerHTML = menuView;
    })
    .catch(error => error);
};

getMenu();
