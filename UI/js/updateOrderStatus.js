const getOrdersToken = localStorage.getItem('token'),
  getAllOrdersSpinner = document.querySelector('.spinner');

const options = {
  year: 'numeric', month: 'long', day: 'numeric'
};

const orderIdGenerator = (orderId, orderDate) => `${orderId.slice(0, 4)}${orderDate.toLocaleDateString('en-GB').slice(0, 2)}${orderDate.toLocaleDateString('en-GB').slice(3, 5)}${orderDate.toLocaleDateString('en-GB').slice(6, 11)}`;
const getOrderHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  token: getOrdersToken
});

const getNewOrdersHeader = {
  method: 'GET',
  mode: 'cors',
  headers: getOrderHeaders
};

let getSingleOrdersView = '';

const getSingleOrder = (url) => {
  getAllOrdersSpinner.classList.remove('hide');
  fetch(url, getNewOrdersHeader)
    .then(res => res.json())
    .then((order) => {
      getAllOrdersSpinner.classList.add('hide');
      addClassToClassList(orderModal, 'is-visible');
      getSingleOrdersView = `<div class="orders"><table><tr><th>Date</th><th>Total
      </th><th>Time</th></tr>`;

      getSingleOrdersView += `<tr><td>${new Date(order.order.date).toLocaleString('en-US', options)}</td>
      <td>#${order.order.total}</td>
      <td>${order.order.date.slice(11, 16)}</td><tr>
      </table>`;

      order.order.items.map((item) => {
        getSingleOrdersView += `<div class="order">
          <div class="order-image">
            <img src="${item.img_url}">
          </div>
          <div class="order-details">
          <h1 class="order-name">${item.name}</h1>
          <h1>Qty: ${item.quantity}</h1>
          <h1>#${item.price}</h1>
          </div>
          </div>`;
        return getSingleOrdersView;
      });
      getSingleOrdersView += '<div>';
      document.querySelector('.adminpage-modal-container').innerHTML = getSingleOrdersView;
    }).catch(error => error);
};

const updateOrderStatus = (url, status, section) => {
  getAllOrdersSpinner.classList.remove('hide');
  const updateStatusHeader = {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify({ orderStatus: status }),
    headers: getOrderHeaders
  };

  fetch(url, updateStatusHeader)
    .then(res => res.json())
    .then(() => {
      getAllOrdersSpinner.classList.add('hide');
      if (section === 'new') {
        newOrdersSectionSelected();
      }
      if (section === 'processing') {
        processingOrdersSectionSelected();
      }
      if (section === 'completed') {
        completedOrdersSectionSelected();
      }
      if (section === 'cancelled') {
        declinedOrdersSectionSelected();
      }
    }).catch((err) => {
      throw err;
    });
};
