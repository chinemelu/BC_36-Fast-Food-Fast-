const placeOrderValidator = (req, res, next) => {
  const errors = {};
  // Sanitise the data to prevent empty spaces counting as characters
  let {
    name,
    price,
    quantity
  } = req.body;


  name = name.trim();
  price = price.trim();
  quantity = quantity.trim();

  // Validate the name, price and quantity
  if (!name) {
    errors.name = 'Name field is required';
  } else if (!/^[A-Za-z]*$/.test(name)) {
    errors.name = 'Name should consist of only alphabets';
  }
  if (!price) {
    errors.price = 'Price field is required';
  } else if (!/^[0-9]*$/.test(price)) {
    errors.price= 'Price must be an integer'
  }
  } else if (!validator.isLength(data.description, { min: 4 })) {
    errors.description = 'Description must have a minimum length of 4 characters';
  }

  if (!validator.isEmpty(data.privacy) && (!validator.equals(data.privacy, 'private', 'public')
  && !validator.equals(data.privacy, 'public'))) {
    errors.privacy = 'Please enter private or public';
  }

  next();
};

export default placeOrderValidator;
