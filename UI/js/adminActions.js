const manageFoodItemBtn = document.querySelector('.manage-food-items'),
  successMessage = document.querySelector('.cd-success-message'),
  errorBannerMessage = document.querySelector('.cd-error-banner-message'),
  foodItemName = document.querySelector('#item-name'),
  nameErrorMessage = document.querySelector('#add-menu-name-error'),
  foodItemPrice = document.querySelector('#item-price'),
  priceErrorMessage = document.querySelector('#add-menu-price-error'),
  fileUpload = document.querySelector('#file-upload'),
  imageErrorMessage = document.querySelector('#add-menu-img-error'),
  adminSpinner = document.getElementById('admin-spinner'),
  addToMenuBtn = document.querySelector('.add-food-item-btn');

// Cloudinary reference Image Upload in 15 Minutes with Cloudinary and Javascript
//  Tutorial  by DevCoffee

// reference (getURLParameter function)  - https://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript
const getURLParameter = name => decodeURIComponent((new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`)
  .exec(window.location.search) || [null, ''])[1]
  .replace(/\+/g, '%20')) || null;

const successParam = getURLParameter('success');
const duplicateParam = getURLParameter('duplicate');

const paramsMessage = (params, bool, otherMessage, message, innerMessage) => {
  if (params === `${bool}`) {
    otherMessage.innerHTML = '';
    otherMessage.classList.remove('is-visible');
    message.innerHTML = innerMessage;
    message.classList.add('is-visible');
  }
};
if (paramsMessage !== null && paramsMessage !== undefined) {
  paramsMessage(successParam, 'true', errorBannerMessage, successMessage, 'You have successfully added the food item');
  paramsMessage(successParam, 'false', successMessage, errorBannerMessage, 'Error adding food item');
  paramsMessage(duplicateParam, 'true', successMessage, errorBannerMessage, 'Item already exists');
} else {
  successMessage.classList.remove('is-visible');
  errorBannerMessage.classList.remove('is-visible');
}

const addToMenuErrors = {};
const token = localStorage.getItem('token');
const myHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  token
});
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/chinemelu/upload';
const CLOUDINARY_UPLOAD_PRESET = 'd07ctl00';

const getAllFoodItemsHeader = {
  method: 'GET',
  mode: 'cors',
  headers: myHeaders
};

let foodItemsView = `<table>
<tr><th class="serial-th">S/N</th><th class="name-th">Name</th><th class="price-th">Price (naira)</th>
<th class="image-th">Image</th><th class="action-th">Action</th></tr>`;

const getAllFoodItemsUrl = 'https://fast-food-fast-chinemelu.herokuapp.com/api/v1/menu';

const getAllFoodItems = () => {
  adminSpinner.classList.remove('hide');
  fetch(getAllFoodItemsUrl, getAllFoodItemsHeader)
    .then(res => res.json())
    .then((foodItems) => {
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
          <a href="#"><i class="fa fa-edit"></i></a>
          </div> 
            <div class="delete-entry">
          <a href="#"><i class="fa fa-times"></i></a>
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

getAllFoodItems();
manageFoodItemBtn.addEventListener('click', () => {
  window.location.href = 'adminpage.html';
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
    // addToMenuFormError.classList.remove('is-visible');
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
        headers: myHeaders
      };

      fetch(addToMenuUrl, addToMenuParameters)
        .then(res => res.json())
        .then((foodItem) => {
          e.preventDefault();
          adminSpinner.classList.add('hide');
          if (!foodItem.errors && !foodItem.error) {
            window.location.href = 'adminpage.html?success=true';
          }
          if (foodItem.error === 'You are not authorised to perform this action' || foodItem.message === 'No token provided'
          || foodItem.error === 'Invalid token' || foodItem.message === 'You are not authorised to perform this action'
          || foodItem.message === 'User does not exist') {
            window.location.href = 'customerpage.html?admin=false';
          }
          if (foodItem.message === 'Item already exists') {
            window.location.href = 'adminpage.html?duplicate=true';
          } else {
            window.location.href = 'adminpage.html?success=false';
          }
        }).catch((err) => {
          throw err;
        });
    }).catch((err) => {
      throw err;
    });
});
