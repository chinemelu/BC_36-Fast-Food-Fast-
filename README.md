[![Build Status](https://travis-ci.org/chinemelu/BC_36-Fast-Food-Fast-.svg?branch=develop)](https://travis-ci.org/chinemelu/BC_36-Fast-Food-Fast-)
[![Coverage Status](https://coveralls.io/repos/github/chinemelu/BC_36-Fast-Food-Fast-/badge.svg?branch=ch-setup-CI-test-maintainability-coverage-tools-160479457)](https://coveralls.io/github/chinemelu/BC_36-Fast-Food-Fast-?branch=ch-setup-CI-test-maintainability-coverage-tools-160479457)
[![Maintainability](https://api.codeclimate.com/v1/badges/77068c3cba2c7ec69772/maintainability)](https://codeclimate.com/github/chinemelu/BC_36-Fast-Food-Fast-/maintainability)

# BC_36-Fast-Food-Fast-
Fast-Food-Fast​ is a food delivery service app for a restaurant.

## Getting Started
* Click on the "Clone or download" button.
* You can decide to download the zip file of the app onto the system or you can clone the repository from the terminal
* If you decide to clone the repository from the terminal, navigate to a directory of your choice on that terminal.
* Using SSH; copy and paste the following below on your terminal
`git@github.com:chinemelu/BC_36-Fast-Food-Fast-.git`
* Using HTTPS; copy and paste the following below on your terminal
>```https://github.com/chinemelu/BC_36-Fast-Food-Fast-.git```

## Running the tests
* The tests have been written using Mocha, Chai and Chai-http.
* cd into the folder
* Write the following command on terminal.
* ```npm test```
* If the tests are successful, they will complete without failures or errors.
  ```
  .........
  ----------------------------------------------------------------------
    26 passing
  ```

## Routes
* POST ```/api/v1/auth/sign``` Use this route to sign up to the application. The following fields are required
  * ```firstName``` The first name of the user
  * ```lastName``` The last name of the user
  * ```email``` The email of the user. This must not have been used on the application before
  * ```password``` The password to access the site
  * ```reEnterPassword``` This must match the ```password``` field.
* POST ```/api/v1/orders``` Use this route to place an order. The following fields are required
  * ```userId``` The id of the user which is an integer
  * ```items``` The items array containing the food item(s) object(s)
    * ```itemId``` The itemId property of a food item 
    * ```name``` The name property of a food item
    * ```quantity``` The quantity property of a food item
    * ```price``` The unit price property of a food item
* GET ``` /api/v1/orders``` Use this route to get all orders
* GET  ```/api/v1/orders/orderId``` Use this route to get a particular order
* PUT  ```/api/v1/orders/orderId``` Use this route to update the status of an order. The following fields are required
  * ```orderStatus``` The status of an order. The acceptable values are 'completed', 'declined' and 'pending'.

## Deployment
* copy this link `https://fast-food-fast-chinemelu.herokuapp.com/`
* Using Postman, and the url above as a prefix, e.g ` https://fast-food-fast-chinemelu.herokuapp.com/api/v1/orders`
utilise every endpoint in this application a with any of these headers: 
key: Content-Type value: `application/json`  
key: Content-Type value: `application/x-www-form-urlencoded`

### Front End Dependencies
* [Font Awesome](http://fontawesome.io/) -font and CSS toolkit

### Back End Dependencies
* [Node](nodejs.org) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
* [Body-Parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware.
* [dotenv](https://www.npmjs.com/package/dotenv) - dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
* [pg](https://www.npmjs.com/package/pg) - Non-blocking PostgreSQL client for node.js. Pure JavaScript and optional native libpq bindings.
* [jsonwebToken](https://jwt.io/) - JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - A password hashing function
* [dotenv](https://www.npmjs.com/package/dotenv) - dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

## Author
Chinemelu Nwosu

## License
This project is licensed under the MIT License - see the LICENSE.md file for details