const addItemBtn = document.querySelector('.add-food-item'),
  addItemModal = document.querySelector('.add-food-item-modal'),
  manageFoodItemsBtn = document.querySelector('.manage-food-items'),
  manageFoodItemsSection = document.getElementById('manage-food-items-section'),
  newOrdersBtn = document.querySelector('.new-orders'),
  newOrdersSection = document.getElementById('new-section'),
  completedOrdersBtn = document.querySelector('.completed-orders'),
  completedOrdersSection = document.getElementById('completed-section'),
  declinedOrdersBtn = document.querySelector('.declined-orders'),
  declinedOrdersSection = document.getElementById('declined-section'),
  processingOrdersBtn = document.querySelector('.processing-orders'),
  processingOrdersSection = document.getElementById('processing-section'),
  orderModal = document.querySelector('.adminpage-modal');

const adminNav = document.createElement('a');
adminNav.className = 'admin-nav';
document.body.appendChild(adminNav);

let getNewOrdersView = '';
const getNewOrdersUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders?status=new';

const getNewOrders = () => {
  getAllOrdersSpinner.classList.remove('hide');
  fetch(getNewOrdersUrl, getNewOrdersHeader)
    .then(res => res.json())
    .then((orders) => {
      if (!orders.length) {
        document.querySelector('#new-section').innerHTML = 'There are no available orders';
      }
      getNewOrdersView = '<table><tr><th>Order #</th><th>Date</th><th>User</th><th>Order Time</th><th>Action</th></tr>';
      getAllOrdersSpinner.classList.add('hide');
      orders.data.map((order) => {
        getNewOrdersView += `<tr>
          <td><a class="order-link" href="#" onclick="getSingleOrder('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders/${order.order.id}')">${orderIdGenerator(order.order.id, new Date(order.order.date))}</a></td>
          <td>${new Date(order.order.date).toLocaleString('en-US', options)}</td>
          <td><a href="#">${order.order.firstName} ${order.order.lastName}</a></td>
          <td>${order.order.date.slice(11, 16)}</td>
          <td class="admin-action">
            <a href="#" onclick="updateOrderStatus('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders/${order.order.id}', 'processing', 'new')"><i class="fa fa-check accept-order"></i></a>
            <a href="#" onclick="updateOrderStatus('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders/${order.order.id}', 'cancelled', 'new')"><i class="fa fa-times reject-order"></i></a>
          </td>
          </tr>`;
        document.querySelector('#new-section').innerHTML = getNewOrdersView;
        return getNewOrdersView;
      });
    }).catch(error => error);
};


let getProcessingOrdersView = '';
const processingOrdersUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders?status=processing';

const getProcessingOrders = () => {
  getAllOrdersSpinner.classList.remove('hide');
  fetch(processingOrdersUrl, getNewOrdersHeader)
    .then(res => res.json())
    .then((orders) => {
      if (!orders.length) {
        document.querySelector('#processing-section').innerHTML = 'There are no available orders';
      }
      getProcessingOrdersView = '<table><tr><th>Order #</th><th>Date</th><th>User</th><th>Order Time</th><th>Action</th></tr>';
      getAllOrdersSpinner.classList.add('hide');
      orders.data.map((order) => {
        getProcessingOrdersView += `<tr>
          <td><a class="order-link" href="#" onclick="getSingleOrder('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders/${order.order.id}')">${orderIdGenerator(order.order.id, new Date(order.order.date))}</a></td>
          <td>${new Date(order.order.date).toLocaleString('en-US', options)}</td>
          <td><a href="#">${order.order.firstName} ${order.order.lastName}</a></td>
          <td>${order.order.date.slice(11, 16)}</td>
          <td class="admin-action">
            <a href="#" onclick="updateOrderStatus('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders/${order.order.id}', 'complete', 'processing')"><i class="fa fa-check-circle complete-order"></i></a>
            <a  href="#" onclick="updateOrderStatus('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders/${order.order.id}', 'cancelled', 'processing')"><i class="fa fa-times reject-order"></i></a>
          </td>
          </tr>`;
        document.querySelector('#processing-section').innerHTML = getProcessingOrdersView;
        return getProcessingOrdersView;
      }).catch(error => error);
    }).catch(error => error);
};

let getCompletedOrdersView = '';
const completeOrdersUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders?status=complete';

const getCompleteOrders = () => {
  getAllOrdersSpinner.classList.remove('hide');
  fetch(completeOrdersUrl, getNewOrdersHeader)
    .then(res => res.json())
    .then((orders) => {
      if (!orders.length) {
        document.querySelector('#completed-section').innerHTML = 'There are no available orders';
      }
      getCompletedOrdersView = '<table><tr><th>Order #</th><th>Date</th><th>User</th><th>Order Time</th><th>Action</th></tr>';
      getAllOrdersSpinner.classList.add('hide');
      orders.data.map((order) => {
        getCompletedOrdersView += `<tr>
          <td><a class="order-link" href="#" onclick="getSingleOrder('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders/${order.order.id}')">${orderIdGenerator(order.order.id, new Date(order.order.date))}</a></td>
          <td>${new Date(order.order.date).toLocaleString('en-US', options)}</td>
          <td><a href="#">${order.order.firstName} ${order.order.lastName}</a></td>
          <td>${order.order.date.slice(11, 16)}</td>
          <td class="admin-action">
          <a href="#"><i class="fa fa-times reject-order-single" onclick="updateOrderStatus('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders/${order.order.id}', 'cancelled', 'completed')"></i></a>
          </td>
          </tr>`;
        document.querySelector('#completed-section').innerHTML = getCompletedOrdersView;
        return getCompletedOrdersView;
      }).catch(error => error);
    }).catch(error => error);
};

let getCancelledOrdersView = '';
const cancelledOrdersUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders?status=cancelled';

const getCancelledOrders = () => {
  getAllOrdersSpinner.classList.remove('hide');
  fetch(cancelledOrdersUrl, getNewOrdersHeader)
    .then(res => res.json())
    .then((orders) => {
      if (!orders.length) {
        document.querySelector('#declined-section').innerHTML = 'There are no available orders';
      }
      getCancelledOrdersView = '<table><tr><th>Order #</th><th>Date</th><th>User</th><th>Order Time</th><th>Action</th></tr>';
      getAllOrdersSpinner.classList.add('hide');
      orders.data.map((order) => {
        getCancelledOrdersView += `<tr>
          <td><a class="order-link" href="#" onclick="getSingleOrder('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders/${order.order.id}')">${orderIdGenerator(order.order.id, new Date(order.order.date))}</a></td>
          <td>${new Date(order.order.date).toLocaleString('en-US', options)}</td>
          <td><a href="#">${order.order.firstName} ${order.order.lastName}</a></td>
          <td>${order.order.date.slice(11, 16)}</td>
          <td class="admin-action">
          <a href="#"><i class="fa fa-check-circle complete-order" onclick="updateOrderStatus('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders/${order.order.id}', 'complete', 'cancelled')"></i></a>
          </td>
          </tr>`;
        document.querySelector('#declined-section').innerHTML = getCancelledOrdersView;
        return getCancelledOrdersView;
      }).catch(error => error);
    }).catch(error => error);
};

const addClassToClassList = (element, className) => {
  element.classList.add(className);
};

const removeClassFromClassList = (element, className) => {
  element.classList.remove(className);
};

const manageFoodItemsSectionSelected = () => {
  removeClassFromClassList(manageFoodItemsBtn, 'unselected');
  addClassToClassList(manageFoodItemsBtn, 'selected');
  removeClassFromClassList(manageFoodItemsSection, 'unselected');
  removeClassFromClassList(completedOrdersBtn, 'selected');
  removeClassFromClassList(completedOrdersSection, 'selected');
  removeClassFromClassList(declinedOrdersBtn, 'selected');
  removeClassFromClassList(declinedOrdersSection, 'selected');
  removeClassFromClassList(newOrdersBtn, 'selected');
  removeClassFromClassList(newOrdersSection, 'selected');
  removeClassFromClassList(processingOrdersBtn, 'selected');
  removeClassFromClassList(processingOrdersSection, 'selected');
  getAllFoodItems();
};

const newOrdersSectionSelected = () => {
  removeClassFromClassList(manageFoodItemsBtn, 'selected');
  addClassToClassList(manageFoodItemsBtn, 'unselected');
  addClassToClassList(manageFoodItemsSection, 'unselected');
  removeClassFromClassList(completedOrdersBtn, 'selected');
  removeClassFromClassList(completedOrdersSection, 'selected');
  removeClassFromClassList(declinedOrdersBtn, 'selected');
  removeClassFromClassList(declinedOrdersSection, 'selected');
  addClassToClassList(newOrdersBtn, 'selected');
  addClassToClassList(newOrdersSection, 'selected');
  removeClassFromClassList(processingOrdersBtn, 'selected');
  removeClassFromClassList(processingOrdersSection, 'selected');
  getNewOrders();
};

const completedOrdersSectionSelected = () => {
  removeClassFromClassList(manageFoodItemsBtn, 'selected');
  addClassToClassList(manageFoodItemsBtn, 'unselected');
  addClassToClassList(manageFoodItemsSection, 'unselected');
  addClassToClassList(completedOrdersBtn, 'selected');
  addClassToClassList(completedOrdersSection, 'selected');
  removeClassFromClassList(declinedOrdersBtn, 'selected');
  removeClassFromClassList(declinedOrdersSection, 'selected');
  removeClassFromClassList(newOrdersBtn, 'selected');
  removeClassFromClassList(newOrdersSection, 'selected');
  removeClassFromClassList(processingOrdersBtn, 'selected');
  removeClassFromClassList(processingOrdersSection, 'selected');
  getCompleteOrders();
};

const processingOrdersSectionSelected = () => {
  removeClassFromClassList(manageFoodItemsBtn, 'selected');
  addClassToClassList(manageFoodItemsBtn, 'unselected');
  addClassToClassList(manageFoodItemsSection, 'unselected');
  removeClassFromClassList(completedOrdersBtn, 'selected');
  removeClassFromClassList(completedOrdersSection, 'selected');
  removeClassFromClassList(declinedOrdersBtn, 'selected');
  removeClassFromClassList(declinedOrdersSection, 'selected');
  removeClassFromClassList(newOrdersBtn, 'selected');
  removeClassFromClassList(newOrdersSection, 'selected');
  addClassToClassList(processingOrdersBtn, 'selected');
  addClassToClassList(processingOrdersSection, 'selected');
  getProcessingOrders();
};

const declinedOrdersSectionSelected = () => {
  removeClassFromClassList(manageFoodItemsBtn, 'selected');
  addClassToClassList(manageFoodItemsBtn, 'unselected');
  addClassToClassList(manageFoodItemsSection, 'unselected');
  removeClassFromClassList(completedOrdersBtn, 'selected');
  removeClassFromClassList(completedOrdersSection, 'selected');
  addClassToClassList(declinedOrdersBtn, 'selected');
  addClassToClassList(declinedOrdersSection, 'selected');
  removeClassFromClassList(newOrdersBtn, 'selected');
  removeClassFromClassList(newOrdersSection, 'selected');
  removeClassFromClassList(processingOrdersBtn, 'selected');
  removeClassFromClassList(processingOrdersSection, 'selected');
  getCancelledOrders();
};

const selectOrders = (element, event, modal, modalSelector) => {
  element.addEventListener('click', (e) => {
    if (element === manageFoodItemsBtn && event === 'click') {
      manageFoodItemsSectionSelected();
    }
    if (element === newOrdersBtn && event === 'click') {
      newOrdersSectionSelected();
    }
    if (element === completedOrdersBtn && event === 'click') {
      completedOrdersSectionSelected();
    }
    if (element === processingOrdersBtn && event === 'click') {
      processingOrdersSectionSelected();
    }
    if (element === declinedOrdersBtn && event === 'click') {
      declinedOrdersSectionSelected();
    }
    if (element === addItemBtn && event === 'click') {
      addClassToClassList(addItemModal, 'is-visible');
    }
    if (element === modal && event === 'click') {
      if (e.target.matches(modalSelector)) {
        removeClassFromClassList(modal, 'is-visible');
      }
    }
  });
};

selectOrders(manageFoodItemsBtn, 'click');
selectOrders(newOrdersBtn, 'click');
selectOrders(processingOrdersBtn, 'click');
selectOrders(completedOrdersBtn, 'click');
selectOrders(declinedOrdersBtn, 'click');
selectOrders(addItemBtn, 'click');
selectOrders(addItemModal, 'click', addItemModal, '.add-food-item-modal');
selectOrders(orderModal, 'click', orderModal, '.adminpage-modal');
selectOrders(document, 'keyup', orderModal);
selectOrders(document, 'keyup', addItemModal);

// close modal when clicking the esc keyboard button
document.addEventListener('keyup', (event) => {
  if (event.which === 27 || event.code === 'Escape' || event.key === 'Escape') {
    removeClassFromClassList(orderModal, 'is-visible');
    removeClassFromClassList(addItemModal, 'is-visible');
  }
});

const addEventAdminPage = (element, triggerFunction) => {
  element.addEventListener('click', () => {
    triggerFunction();
  });
};

addEventAdminPage(newOrdersBtn, getNewOrders);
addEventAdminPage(completedOrdersBtn, getCompleteOrders);
addEventAdminPage(processingOrdersBtn, getProcessingOrders);
addEventAdminPage(declinedOrdersBtn, getCancelledOrders);

newOrdersSectionSelected();
