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
  orderLinks = document.querySelectorAll('.order-link'),
  orderModal = document.querySelector('.adminpage-modal');

const addClassToClassList = (element, className) => {
  element.classList.add(className);
};

const removeClassFromClassList = (element, className) => {
  element.classList.remove(className);
};

const manageFoodItemsBtnSelected = () => {
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
};

const selectOrders = (element, event, modal, modalSelector) => {
  element.addEventListener('click', (e) => {
    if (element === manageFoodItemsBtn && event === 'click') {
      manageFoodItemsBtnSelected();
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

// show order details modal when the order links are clicked
orderLinks.forEach(orderLink => orderLink.addEventListener('click', () => {
  // this.orderLink = orderLink;
  addClassToClassList(orderModal, 'is-visible');
}));

// close modal when clicking the esc keyboard button
document.addEventListener('keyup', (event) => {
  if (event.which === 27 || event.code === 'Escape' || event.key === 'Escape') {
    removeClassFromClassList(orderModal, 'is-visible');
    removeClassFromClassList(addItemModal, 'is-visible');
  }
});
