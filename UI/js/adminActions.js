const manageFoodItemBtn = document.querySelector('.manage-food-items'),
  successMessage = document.querySelector('.cd-success-message'),
  errorBannerMessage = document.querySelector('.cd-error-banner-message'),
  foodItemName = document.querySelector('#item-name'),
  nameErrorMessage = document.querySelector('#add-menu-name-error'),
  foodItemPrice = document.querySelector('#item-price'),
  priceErrorMessage = document.querySelector('#add-menu-price-error'),
  fileUpload = document.querySelector('#file-upload'),
  imageErrorMessage = document.querySelector('#add-menu-img-error'),
  adminSpinner = document.querySelector('.spinner'),
  addToMenuBtn = document.querySelector('.add-food-item-btn');

// Cloudinary reference Image Upload in 15 Minutes with Cloudinary and Javascript
//  Tutorial  by DevCoffee

const statusMessage = (otherMessage, message, innerMessage) => {
  otherMessage.innerHTML = '';
  otherMessage.classList.remove('is-visible');
  message.innerHTML = innerMessage;
  message.classList.add('is-visible');
};

const addToMenuErrors = {};
const adminToken = localStorage.getItem('token');
const myAdminHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  token: adminToken
});
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/chinemelu/upload';
const CLOUDINARY_UPLOAD_PRESET = 'd07ctl00';

const getAllFoodItemsHeader = {
  method: 'GET',
  mode: 'cors',
  headers: myAdminHeaders
};

const deleteItem = (deleteFromMenuUrl) => {
  adminSpinner.classList.remove('hide');

  const deleteFromMenuParameters = {
    method: 'DELETE',
    mode: 'cors',
    headers: myAdminHeaders
  };

  fetch(deleteFromMenuUrl, deleteFromMenuParameters)
    .then((res) => {
      adminSpinner.classList.add('hide');
      removeClassFromClassList(deleteConfirmationModal, 'is-visible');

      if (res.status === 200) {
        manageFoodItemsSectionSelected();
        statusMessage(errorBannerMessage, successMessage, 'You have successfully deleted the food item');
      }
      if (res.status === 401 || res.status === 403) {
        window.location.href = 'customerpage.html?admin=false';
      }
      if (res.status === 404) {
        statusMessage(successMessage, errorBannerMessage, 'Item does not exist');
      }
      if (res.status === 500) {
        manageFoodItemsSectionSelected();
        statusMessage(successMessage, errorBannerMessage, 'Error deleting the food item');
      }
    }).catch((err) => {
      throw err;
    });
};

const openConfirmationModal = (url, name) => {
  let deleteConfirmationModalView = `<div class="delete-food-item-modal-header">
  <h3>Delete confirmation</h3><span class="cancel-delete-food-item-modal">x</span>
  </div>`;

  deleteConfirmationModalView += `<div class="delete-food-item-modal-body">
  <p>Are you sure you want to delete ${name}?</p>
  </div>`;

  deleteConfirmationModalView += `<div class="delete-food-item-modal-footer">
  <button class="delete-item-btn">Delete</button>
  <button class="close-modal-btn">Close</button>	
</div>`;

  document.querySelector('.delete-food-item-modal-content').innerHTML = deleteConfirmationModalView;
  addClassToClassList(deleteConfirmationModal, 'is-visible');

  createElement('deleteButton', 'a', 'delete-item-btn');
  createElement('closeModalBtn', 'a', 'close-modal-btn');
  createElement('cancelModalIcon', 'a', 'cancel-delete-food-item-modal');

  const closeModalButton = document.createElement('button');

  document.addEventListener('click', (e) => {
    if (e.target.className === 'delete-item-btn') {
      deleteItem(url);
    }
    if (e.target.className === 'close-modal-btn' || e.target.className === 'cancel-delete-food-item-modal') {
      removeClassFromClassList(deleteConfirmationModal, 'is-visible');
    }
  })
};

let foodItemsView = '';

const getAllFoodItemsUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/menu';

const getAllFoodItems = () => {
  adminSpinner.classList.remove('hide');
  fetch(getAllFoodItemsUrl, getAllFoodItemsHeader)
    .then(res => res.json())
    .then((foodItems) => {
      foodItemsView = `<table>
<tr><th class="serial-th">S/N</th><th class="name-th">Name</th><th class="price-th">Price (naira)</th>
<th class="image-th">Image</th><th class="action-th">Action</th></tr>`;
      adminSpinner.classList.add('hide');
      let total = 0;
      foodItems.data.map((foodItem) => {
        foodItemsView += `<tr>
        <td>${total += 1}</td>
        <td>${foodItem.name}</td>
       <td>${foodItem.price}</td>
      <td><div class="image">
      <img src=${foodItem.img_url}>
      </div>
       </td>
         <td class="admin-action">
         <div class="edit-entry">
          <a href="#"><i class="fa fa-edit edit-item"></i></a>
          </div> 
            <div class="delete-entry">
          <a href="#" onclick="openConfirmationModal('https://fast-food-fast-chinemelu.herokuapp.com/api/v1/menu/${foodItem.id}', '${foodItem.name}')"><i class="fa fa-times delete-item"></i></a>
          </div>
         </td>
       </tr>
       `;
        return foodItemsView;
      });
      document.getElementById('manage-food-items-entry').innerHTML = foodItemsView;
    })
    .catch(error => error);
};

manageFoodItemBtn.addEventListener('click', () => {
  getAllFoodItems();
});


const addToMenuUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/menu';


const nameValidator = () => {
  if (!foodItemName.value.trim()) {
    addToMenuErrors.name = 'Name is required';
    nameErrorMessage.classList.add('is-visible');
    nameErrorMessage.innerHTML = addToMenuErrors.name;
    addToMenuBtn.disabled = true;
  } else if (foodItemName.value.trim() && !(/^[a-zA-Z ]+$/.test(foodItemName.value.trim()))) {
    addToMenuErrors.name = 'Name should consist of only alphabets';
    nameErrorMessage.classList.add('is-visible');
    nameErrorMessage.innerHTML = addToMenuErrors.name;
    addToMenuBtn.disabled = true;
  } else {
    delete (addToMenuErrors.name);
    nameErrorMessage.classList.remove('is-visible');
    addToMenuBtn.disabled = false;
  }
};

const priceValidator = () => {
  if (!foodItemPrice.value.trim()) {
    addToMenuErrors.price = 'Price is required';
    priceErrorMessage.classList.add('is-visible');
    priceErrorMessage.innerHTML = addToMenuErrors.price;
    addToMenuBtn.disabled = true;
  } else if (foodItemPrice.value.trim() && !(/^-?\d+\.?\d*$/).test(foodItemPrice.value.trim())) {
    addToMenuErrors.price = 'Please enter a valid price';
    priceErrorMessage.classList.add('is-visible');
    priceErrorMessage.innerHTML = addToMenuErrors.price;
    addToMenuBtn.disabled = true;
  } else {
    delete (addToMenuErrors.price);
    priceErrorMessage.classList.remove('is-visible');
    addToMenuBtn.disabled = false;
  }
};


const imageValidator = () => {
  if (!fileUpload.files.length) {
    addToMenuErrors.fileUpload = 'Image is required';
    imageErrorMessage.classList.add('is-visible');
    imageErrorMessage.innerHTML = addToMenuErrors.fileUpload;
    addToMenuBtn.disabled = true;
  } else if (fileUpload.files.length && !(/\.(jpeg|jpg|gif|png)($|\?)/).test(fileUpload.files[0].name)) {
    addToMenuErrors.fileUpload = 'Please enter a valid image file';
    imageErrorMessage.classList.add('is-visible');
    imageErrorMessage.innerHTML = addToMenuErrors.fileUpload;
    addToMenuBtn.disabled = true;
  } else {
    delete (addToMenuErrors.fileUpload);
    imageErrorMessage.classList.remove('is-visible');
    addToMenuBtn.disabled = false;
  }
};

const onKeyDown = (parameter, errorMessage) => {
  parameter.addEventListener('keydown', () => {
    errorMessage.classList.remove('is-visible');
    addToMenuBtn.disabled = false;
  });
};

const onAddMenuEvent = (element, event) => {
  element.addEventListener(event, () => {
    if (event === 'blur' && element === foodItemPrice) {
      priceValidator();
    }
    if (event === 'blur' && element === foodItemName) {
      nameValidator();
    }
    if (event === 'blur' && element === fileUpload) {
      imageValidator();
    }
    if (event === 'change' && element === fileUpload) {
      imageValidator();
    }
    if (event === 'mouseenter' && element === addToMenuBtn) {
      nameValidator();
      priceValidator();
      imageValidator();
    }
    if (Object.keys(addToMenuErrors).length === 0) {
      addToMenuBtn.disabled = false;
    } else {
      addToMenuBtn.disabled = true;
    }
  });
};

onAddMenuEvent(fileUpload, 'blur');
onAddMenuEvent(fileUpload, 'change');
onAddMenuEvent(foodItemName, 'blur');
onAddMenuEvent(foodItemPrice, 'blur');
onAddMenuEvent(addToMenuBtn, 'mouseenter');
onKeyDown(foodItemName, nameErrorMessage);
onKeyDown(foodItemPrice, priceErrorMessage);
onKeyDown(fileUpload, imageErrorMessage);


addToMenuBtn.addEventListener('click', (e) => {
  adminSpinner.classList.remove('hide');
  e.preventDefault();
  const imgFile = fileUpload.files[0];
  const formData = new FormData();
  formData.append('file', imgFile);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const uploadImageUrl = CLOUDINARY_URL;

  const uploadImageParameters = {
    method: 'POST',
    body: formData,
  };

  fetch(uploadImageUrl, uploadImageParameters)
    .then(res => res.json())
    .then((imgUploadResponse) => {
      if (Object.keys(imgUploadResponse).length === 0) {
        addToMenuBtn.disabled = false;
      }

      const menuDetails = {
        name: foodItemName.value,
        price: foodItemPrice.value,
        imgUrl: imgUploadResponse.secure_url
      };

      const addToMenuParameters = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(menuDetails),
        headers: myAdminHeaders
      };

      fetch(addToMenuUrl, addToMenuParameters)
        .then((res) => {
          adminSpinner.classList.add('hide');
          removeClassFromClassList(addItemModal, 'is-visible');
          if (res.status === 201) {
            manageFoodItemsSectionSelected();
            statusMessage(errorBannerMessage, successMessage, 'You have successfully added the food item');
          }
          if (res.status === 401 || res.status === 403) {
            window.location.href = 'customerpage.html?admin=false';
          }
          if (res.status === 404) {
            window.location.href = 'customerpage.html?admin=false';
          }
          if (res.status === 409) {
            manageFoodItemsSectionSelected();
            statusMessage(successMessage, errorBannerMessage, 'Item already exists');
          }
          if (res.status === 500) {
            manageFoodItemsSectionSelected();
            statusMessage(successMessage, errorBannerMessage, 'Error adding food item');
          }
        }).catch((err) => {
          throw err;
        });
    }).catch((err) => {
      throw err;
    });
});
