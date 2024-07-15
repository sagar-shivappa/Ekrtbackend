# NodeJS: Ekart Node JS API

## Project Overview

This project outlines the development of a RESTful API using Express.js and MongoDB to manage a collection Ekart project with user authentication using jwt token.

## Project Goal

The goal is to create a user-friendly API that allows the client to:

- Perform crud operations for Ekart application.
- handle user authenication using jwt token.

## Provided Components

- **Cart Model (`models/cart.model.js`)**: This file defines the Mongoose schema for the cart model, including properties like `user_id`, `products`.
- **Product Model (`models/product.model.js`)**: This file defines the Mongoose schema for the Product model, including properties like `product_id`, `product_name`, `product_description`, `price`, `discount_percentage`, `image`and `product_brand`
- **User Model (`models/user.model.js`)**: This file defines the Mongoose schema for the User model, including properties like `user_id`, `user_name`, `password`
- **Incomplete Express.js Application**: A basic Express.js application structure is provided, including essential dependencies and project setup.

> Note: You are not required to modify any existing code outside the `controllers` and `routes` folders.

## Implementation Tasks

### [middleware/tokenValidator.js](cmiddleware/tokenValidator.js):

Complete the tokenValidator function to validate jwt token, consider

- Only for route '/login', no token validation is required.
- Token should be passed in the headers, as authorization
- Token type should be of type Bearer
  secret-key is provided in .env file, use the same for token validation
- If any of the above validation is failing, return status code of 400, with the response message

```bash
    {
      message: "No token found" / "Invalid token" / "Invalid Token Type"
    }
```

- On successful validation, pass the function next();

### [routes/ekart.route.js](routes/ekart.route.js):

Define routes for the API endpoints:

- **`/login`**:

  - Handles POST request, to login the user.
  - Calls the `postLoginUser` function from the `ekart.controller.js` file.

- **`/products`**:

  - Handles GET requests to retrieve all products.
  - Calls the `getAllProducts` function from the `ekart.controller.js` file.

- **`/cart/user_id`**:

  - Handles GET requests to retrieve all products for that particular user_id.
  - Calls the `getCartItemsByUserId` function from the `ekart.controller.js` file.

- **`/cart`**:

  - Handles POST requests to add the new product to cart of that particular user.
  - Calls the `addToCart` function from the `ekart.controller.js` file.

- **`/cart/user_id/product_id`**:

  - Handles DELETE requests to remove the product from cart for that particular user.
  - Calls the `removeFromCart` function from the `ekart.controller.js` file.

### [controllers/ekart.controller.js](controllers/ekart.controller.js):

Implement the following functions:

- **`postLoginUser`**:

Note : We have already added 3 dummy users for the DB. Refer iniliazeDB to find out the users and their user_name, password

```bash
 Sample Request Body :
    {
    user_name:"doSelect",
    password:"tester123"
   }

Response:
{
  user_name:"doSelect",
  token:"eyeennjnajnsja*******"﻿
}
```

- This endpoint allows you to post the request and validate the credentials.
- Upon successful validation, the response should have a status code of 201 and the user_name and JWT token as the response.
- If any required fields are missing in the request body, a status code of 400 (Bad Request) should be returned with an error message indicating the missing fields.
- Validation fails if the user_name and password does not match, then the response should contain a 403 status code, with a message: User Not found
- In case of any error during login, a status code of 500 (Internal Server Error) should be returned with an error message in the response body.

- **`getAllProducts`**:

  - This endpoint retrieves all existing products from the database.
  - Upon successful retrieval, it returns a JSON response with an array of product objects with a status code of 200 (OK)
  - If no products exist, the response should have a status code of 204 (No Content) with an empty body.
  - In case of any error during retrieval, a status code of 500 (Internal Server Error) should be returned with an error message in the response body

- **`getCartItemsByUserId`**:

  - Takes a user ID as a parameter. Find the user information in the initializeDB.js file.
  - Searches the collection for the document with the matching user_id.
  - If found, return the document with a 200 status code.
  - If the user_id is not found, send a 404 status code.
  - Errors during retrieval are handled with a 500 status code and an error message.

- **`addToCart`**:

```bash
 Sample Request Body :
    {
      user_id : 1,
      product_id: 198
    }
```

Note : Find the available user_id from CART collection & product_id from PRODUCT collection, refer initialzeDB.js file .

- Pass user_id & product_id in the request body.
- If the product is already available CART collection, for that user, return a status code of 400 with the message “Product Already in the CART”.
- If the product information is invalid/not available in the DB, return 400 status code, with message “Invalid Product Information”.
- Fetch the the product information from PRODUCT collection, and add it to the particular user's cart. Return a status code of 200 and message "Successfully Added to CART "
- Any errors while adding the product to the cart, handle with a 500 status code and an error message.

- **`removeFromCart`**:
  - Takes a user_id & product_id in the parameters.
  - Searches the CART collection for the document with the matching user_id & product_id.
  - If found, remove the product from the products array and send 200 status code and message "Product successfully removed".
  - If the product is not found, return a 404 status code, with the message “Product not found”
  - Any errors encountered during the product removal are handled with a 500 status code and an error message.

## Commands

### Install Packages:

```bash
npm install
```

This command will run automatically when the IDE is launched. However, if stopped, you may need to run it manually.

### Start MongoDB:

```bash
mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log
```

This command will run automatically when the IDE is launched. However, if stopped, you may need to run it manually.

### Start API Server:

```bash
npm start
```

This command will start the server.

- Once the server is started, navigate to the Thunder Client's tab ![Thunder client's tab](https://media-doselect.s3.amazonaws.com/generic/ryM78VN71g10k2dKr9K2wGYwo/ThunderClientLogo.png) and click on `New Request`.
- Test the API endpoints by sending specific requests to http://localhost:8000/{endpoints}. You can view the JSON response in the "Response" tab.

### Run Test Cases:

```bash
npm test
```

This will run the test cases in the terminal.

> These commands can be executed in the terminal or by selecting the options from the `Run` menu.

## Environment

- Node Version: 14.21.3
- MongoDB Version: 7.0.3
- Default Port: 8001
