const addItemBtn = document.querySelector('.add-food-item'),
  addItemModal = document.querySelector('.add-food-item-modal'),
  manageFoodItemsBtn = document.querySelector('.manage-food-items'),
  manageFoodItemsSection = document.getElementById('manage-food-items-section'),
  pendingOrdersBtn = document.querySelector('.pending-orders'),
  pendingOrdersSection = document.getElementById('pending-section'),
  completedOrdersBtn = document.querySelector('.completed-orders'),
  completedOrdersSection = document.getElementById('completed-section'),
  declinedOrdersBtn = document.querySelector('.declined-orders'),
  declinedOrdersSection = document.getElementById('declined-section'),
  orderLinks = document.querySelectorAll('.order-link'),
  orderModal = document.querySelector('.adminpage-modal');

const addClassToClassList = (element, className) => {
  element.classList.add(className);
};

const removeClassFromClassList = (element, className) => {
  element.classList.remove(className);
};

const closeModalOnBackgroundClick = (modal, modalSelector) => {
  modal.addEventListener('click', (event) => {
    if (event.target.matches(modalSelector)) {
      modal.classList.remove('is-visible');
    }
  });
};

manageFoodItemsBtn.addEventListener('click', () => {
  removeClassFromClassList(manageFoodItemsBtn, 'unselected');
  addClassToClassList(manageFoodItemsBtn, 'selected');
  removeClassFromClassList(manageFoodItemsSection, 'unselected');
  removeClassFromClassList(completedOrdersBtn, 'selected');
  removeClassFromClassList(completedOrdersSection, 'selected');
  removeClassFromClassList(declinedOrdersBtn, 'selected');
  removeClassFromClassList(declinedOrdersSection, 'selected');
  removeClassFromClassList(pendingOrdersBtn, 'selected');
  removeClassFromClassList(pendingOrdersSection, 'selected');
});

pendingOrdersBtn.addEventListener('click', () => {
  removeClassFromClassList(manageFoodItemsBtn, 'selected');
  addClassToClassList(manageFoodItemsBtn, 'unselected');
  addClassToClassList(manageFoodItemsSection, 'unselected');
  removeClassFromClassList(completedOrdersBtn, 'selected');
  removeClassFromClassList(completedOrdersSection, 'selected');
  removeClassFromClassList(declinedOrdersBtn, 'selected');
  removeClassFromClassList(declinedOrdersSection, 'selected');
  addClassToClassList(pendingOrdersBtn, 'selected');
  addClassToClassList(pendingOrdersSection, 'selected');
});

completedOrdersBtn.addEventListener('click', () => {
  removeClassFromClassList(manageFoodItemsBtn, 'selected');
  addClassToClassList(manageFoodItemsBtn, 'unselected');
  addClassToClassList(manageFoodItemsSection, 'unselected');
  addClassToClassList(completedOrdersBtn, 'selected');
  addClassToClassList(completedOrdersSection, 'selected');
  removeClassFromClassList(declinedOrdersBtn, 'selected');
  removeClassFromClassList(declinedOrdersSection, 'selected');
  removeClassFromClassList(pendingOrdersBtn, 'selected');
  removeClassFromClassList(pendingOrdersSection, 'selected');
});

declinedOrdersBtn.addEventListener('click', () => {
  removeClassFromClassList(manageFoodItemsBtn, 'selected');
  addClassToClassList(manageFoodItemsBtn, 'unselected');
  addClassToClassList(manageFoodItemsSection, 'unselected');
  removeClassFromClassList(completedOrdersBtn, 'selected');
  removeClassFromClassList(completedOrdersSection, 'selected');
  addClassToClassList(declinedOrdersBtn, 'selected');
  addClassToClassList(declinedOrdersSection, 'selected');
  removeClassFromClassList(pendingOrdersBtn, 'selected');
  removeClassFromClassList(pendingOrdersSection, 'selected');
});


// show add items modal when the add item button is clicked
addItemBtn.addEventListener('click', () => {
  addItemModal.classList.add('is-visible');
});

// close modal when you click on the add item modal background
closeModalOnBackgroundClick(addItemModal, '.add-food-item-modal');

// show order details modal when the order links are clicked
orderLinks.forEach(orderLink => orderLink.addEventListener('click', () => {
// this.orderLink = orderLink;
  orderModal.classList.add('is-visible');
}));


// close modal when you click on the order modal background
closeModalOnBackgroundClick(orderModal, '.adminpage-modal');


// close modal when clicking the esc keyboard button
document.addEventListener('keyup', (event) => {
  if (event.which === 27 || event.code === 'Escape' || event.key === 'Escape') {
    orderModal.classList.remove('is-visible');
    addItemModal.classList.remove('is-visible');
  }
});
