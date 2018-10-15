const { userId } = decodedNavbarToken,
  orderHistorySpinner = document.querySelector('.spinner');

let orderHistoryView = '<h1 id="mh-order-history">Your Orders</h1><table>';
const orderHistoryUrl = `https://fast-food-fast-chinemelu.herokuapp.com/api/v1/users/${userId}/orders`;

const userHistoryHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  token: navbarToken
});

const userHistoryHeader = {
  method: 'GET',
  mode: 'cors',
  headers: userHistoryHeaders
};

const options = {
  year: 'numeric', month: 'long', day: 'numeric'
};

const orderIdGenerator = (orderId, orderDate) => `${orderId.slice(0, 4)}${orderDate.toLocaleDateString('en-GB').slice(0, 2)}${orderDate.toLocaleDateString('en-GB').slice(3, 5)}${orderDate.toLocaleDateString('en-GB').slice(6, 11)}`;


const getUserOrderHistory = () => {
  orderHistorySpinner.classList.remove('hide');
  fetch(orderHistoryUrl, userHistoryHeader)
    .then(res => res.json())
    .then((orders) => {
      orderHistorySpinner.classList.add('hide');
      orders.map((order) => {
        orderHistoryView += `<table><tr><th>Date</th><th>Total</th><th>Order #${orderIdGenerator(order.order.id, new Date(order.order.date))}</th></tr>
        <tr><td>${new Date(order.order.date).toLocaleString('en-US', options)}</td><td class="total-price">#${order.order.total}</td><td></td></tr>
        <tr>`;

        order.order.items.map((item) => {
          orderHistoryView += `<td>
          <div class="order">
          <div class="order-image">
            <img src="${item.img_url}">
          </div>
          </td>
          <td>
          <div class="order-details">
          <p class="order-name">${item.name}</p>
          <p>Qty: ${item.quantity}</p>
          <p>#${item.price}</p>
          </div>
          </td>
          <td></td>
          </tr>
          `;
          return orderHistoryView;
        });
        orderHistoryView += '</table>';
        document.querySelector('.order-history-entry').innerHTML = orderHistoryView;
        return orderHistoryView;
      });
    }).catch(error => error);
};

getUserOrderHistory();
