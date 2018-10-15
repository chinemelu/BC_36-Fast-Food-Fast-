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

let getNewOrdersView = '<table><tr><th>Order #</th><th>Date</th><th>User</th><th>Order Time</th><th>Action</th></tr>';
const getNewOrdersUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders?status=new';

const getNewOrders = () => {
  getAllOrdersSpinner.classList.remove('hide');
  fetch(getNewOrdersUrl, getNewOrdersHeader)
    .then(res => res.json())
    .then((orders) => {
      getAllOrdersSpinner.classList.add('hide');
      orders.data.map((order) => {
        getNewOrdersView += `<tr>
          <td><a class="order-link" href="#">${orderIdGenerator(order.order.id, new Date(order.order.date))}</a></td>
          <td>${new Date(order.order.date).toLocaleString('en-US', options)}</td>
          <td><a href="#">${order.order.firstName} ${order.order.lastName}</a></td>
          <td>${order.order.date.slice(11, 16)}</td>
          <td class="admin-action">
            <a href="#"><i class="fa fa-check accept-order"></i></a>
            <a href="#"><i class="fa fa-times reject-order"></i></a>
          </td>
          </tr>`;
        document.querySelector('#new-section').innerHTML = getNewOrdersView;
        return getNewOrdersView;
      }).catch(error => error);
    }).catch(error => error);
};

newOrdersBtn.addEventListener('click', () => {
  getNewOrders();
});

let getProcessingOrdersView = '<table><tr><th>Order #</th><th>Date</th><th>User</th><th>Order Time</th><th>Action</th></tr>';
const processingOrdersUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders?status=processing';

const getProcessingOrders = () => {
  getAllOrdersSpinner.classList.remove('hide');
  fetch(processingOrdersUrl, getNewOrdersHeader)
    .then(res => res.json())
    .then((orders) => {
      getAllOrdersSpinner.classList.add('hide');
      orders.data.map((order) => {
        getProcessingOrdersView += `<tr>
          <td><a class="order-link" href="#">${orderIdGenerator(order.order.id, new Date(order.order.date))}</a></td>
          <td>${new Date(order.order.date).toLocaleString('en-US', options)}</td>
          <td><a href="#">${order.order.firstName} ${order.order.lastName}</a></td>
          <td>${order.order.date.slice(11, 16)}</td>
          <td class="admin-action">
            <a href="#"><i class="fa fa-check-circle complete-order"></i></a>
            <a  href="#"><i class="fa fa-times reject-order"></i></a>
          </td>
          </tr>`;
        document.querySelector('#processing-section').innerHTML = getProcessingOrdersView;
        return getProcessingOrdersView;
      }).catch(error => error);
    }).catch(error => error);
};

processingOrdersBtn.addEventListener('click', () => {
  getProcessingOrders();
});

let getCompletedOrdersView = '<table><tr><th>Order #</th><th>Date</th><th>User</th><th>Order Time</th><th>Action</th></tr>';
const completeOrdersUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders?status=complete';

const getCompleteOrders = () => {
  getAllOrdersSpinner.classList.remove('hide');
  fetch(completeOrdersUrl, getNewOrdersHeader)
    .then(res => res.json())
    .then((orders) => {
      getAllOrdersSpinner.classList.add('hide');
      orders.data.map((order) => {
        getCompletedOrdersView += `<tr>
          <td><a class="order-link" href="#">${orderIdGenerator(order.order.id, new Date(order.order.date))}</a></td>
          <td>${new Date(order.order.date).toLocaleString('en-US', options)}</td>
          <td><a href="#">${order.order.firstName} ${order.order.lastName}</a></td>
          <td>${order.order.date.slice(11, 16)}</td>
          <td class="admin-action">
          <a href="#"><i class="fa fa-times reject-order-single"></i></a>
          </td>
          </tr>`;
        document.querySelector('#completed-section').innerHTML = getCompletedOrdersView;
        return getCompletedOrdersView;
      }).catch(error => error);
    }).catch(error => error);
};

completedOrdersBtn.addEventListener('click', () => {
  getCompleteOrders();
});

let getCancelledOrdersView = '<table><tr><th>Order #</th><th>Date</th><th>User</th><th>Order Time</th><th>Action</th></tr>';
const cancelledOrdersUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders?status=cancelled';

const getCancelledOrders = () => {
  getAllOrdersSpinner.classList.remove('hide');
  fetch(cancelledOrdersUrl, getNewOrdersHeader)
    .then(res => res.json())
    .then((orders) => {
      getAllOrdersSpinner.classList.add('hide');
      orders.data.map((order) => {
        getCancelledOrdersView += `<tr>
          <td><a class="order-link" href="#">${orderIdGenerator(order.order.id, new Date(order.order.date))}</a></td>
          <td>${new Date(order.order.date).toLocaleString('en-US', options)}</td>
          <td><a href="#">${order.order.firstName} ${order.order.lastName}</a></td>
          <td>${order.order.date.slice(11, 16)}</td>
          <td class="admin-action">
          <a href="#"><i class="fa fa-check-circle complete-order"></i></a>
          </td>
          </tr>`;
        document.querySelector('#declined-section').innerHTML = getCancelledOrdersView;
        return getCancelledOrdersView;
      }).catch(error => error);
    }).catch(error => error);
};

declinedOrdersBtn.addEventListener('click', () => {
  getCancelledOrders();
});
