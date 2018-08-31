const pendingOrdersBtn = document.querySelector('.pending-orders'),
      pendingOrdersSection = document.getElementById('pending-section'),
      completedOrdersBtn = document.querySelector('.completed-orders'),
      completedOrdersSection = document.getElementById('completed-section'),
	  declinedOrdersBtn = document.querySelector('.declined-orders'),
	  declinedOrdersSection = document.getElementById('declined-section'),
	  orderLinks = document.querySelectorAll('.order-link'),
	  orderModal = document.querySelector('.adminpage-modal');
	  
pendingOrdersBtn.addEventListener('click', () => {
	completedOrdersSection.classList.remove('selected');
	declinedOrdersSection.classList.remove('selected');
	pendingOrdersSection.classList.remove('unselected');
	
})

completedOrdersBtn.addEventListener('click', () => {
	pendingOrdersSection.classList.add('unselected');
	declinedOrdersSection.classList.remove('selected');
	completedOrdersSection.classList.add('selected');
})

declinedOrdersBtn.addEventListener('click', () => {
	pendingOrdersSection.classList.add('unselected');
	completedOrdersSection.classList.remove('selected');
	declinedOrdersSection.classList.add('selected');
})

// show order details modal when the order links are clicked
orderLinks.forEach(orderLink => orderLink.addEventListener('click', () => {
	// this.orderLink = orderLink;
	orderModal.classList.add('is-visible');
}))


// close modal when you click on the background
orderModal.addEventListener('click', (event) => {
  if (event.target.matches('.adminpage-modal')) {
    orderModal.classList.remove('is-visible');
  }
});

// close modal when clicking the esc keyboard button
document.addEventListener('keyup', (event) => {
  if (event.which === 27 || event.code === 'Escape' || event.key === 'Escape') {
    orderModal.classList.remove('is-visible');
  }
});