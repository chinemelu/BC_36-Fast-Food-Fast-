const address = document.querySelector('.address'),
  mobileNumber = document.querySelector('.mobilenumber'),
  addressErrorMessage = document.getElementById('cd-address-error-message'),
  orderBtn = document.querySelector('.order-btn'),
  deliveryToken = localStorage.getItem('token'),
  myDetailsSpinner = document.querySelector('.spinner'),
  numberErrorMessage = document.getElementById('cd-mobile-error-message');

const cartErrors = {};

const addressValidator = () => {
  if (!address.value.trim()) {
    cartErrors.address = 'Address is required';
    addressErrorMessage.classList.add('is-visible');
    addressErrorMessage.innerHTML = cartErrors.address;
    orderBtn.disabled = true;
  } else {
    delete (cartErrors.address);
    addressErrorMessage.classList.remove('is-visible');
    orderBtn.disabled = false;
  }
};

const numberValidator = () => {
  if (mobileNumber.value.trim() && !/^\d{11}$/.test(mobileNumber.value.trim())) {
    cartErrors.mobileNumber = 'Phone number must be 11 digits';
    numberErrorMessage.classList.add('is-visible');
    numberErrorMessage.innerHTML = cartErrors.mobileNumber;
    orderBtn.disabled = true;
  } else {
    delete (cartErrors.mobileNumber);
    numberErrorMessage.classList.remove('is-visible');
    orderBtn.disabled = false;
  }
};

const onAddDeliveryDetailsEvent = (element, event) => {
  element.addEventListener(event, () => {
    if (event === 'blur' && element === address) {
      addressValidator();
    }
    if (event === 'blur' && element === mobileNumber) {
      numberValidator();
    }
    if (event === 'input' && element === address) {
      addressValidator();
    }
    if (event === 'input' && element === mobileNumber) {
      numberValidator();
    }
    if (event === 'click' && element === orderBtn) {
      addressValidator();
      numberValidator();
    }
    if (event === 'mouseenter' && element === orderBtn) {
      addressValidator();
      numberValidator();
    }
    if (Object.keys(cartErrors).length === 0) {
      orderBtn.disabled = false;
    } else {
      orderBtn.disabled = true;
    }
  });
};

onAddDeliveryDetailsEvent(address, 'blur');
onAddDeliveryDetailsEvent(mobileNumber, 'blur');
onAddDeliveryDetailsEvent(address, 'input');
onAddDeliveryDetailsEvent(mobileNumber, 'input');
onAddDeliveryDetailsEvent(orderBtn, 'mouseenter');

const myOrderHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  token: deliveryToken
});


const orderFood = () => {
  myDetailsSpinner.classList.remove('hide');
  const orderFoodUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders';
  const foodOrderDetails = {
    address: address.value,
    mobileNumber: mobileNumber.value
  };
  const orderFoodHeader = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(foodOrderDetails),
    headers: myOrderHeaders
  };
  fetch(orderFoodUrl, orderFoodHeader)
    .then((res) => {
      myDetailsSpinner.classList.add('hide');
      if (res.status === 201) {
        window.location.href = 'customercart.html?success=true';
      }
      if (res.status === 404 || res.status === 401 || res.status === 403) {
        window.location.href = 'customerpage.html?admin=false';
      }
    })
    .catch(error => error);
};

orderBtn.addEventListener('click', (e) => {
  e.preventDefault();
  orderFood();
});
