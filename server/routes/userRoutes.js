import express from 'express';
import uuidValidator from '../middleware/uuidValidator';
import authenticateUser from '../middleware/authenticateUser';
import authenticateToken from '../middleware/authenticateToken';
import doesParamsUserExist from '../middleware/doesParamsUserExist';
import getUserOrdersController from '../controllers/orderController/GetUsersOrderHistory';

const router = express.Router();

router.get(
  '/:id/orders', uuidValidator, authenticateToken, doesParamsUserExist, authenticateUser, getUserOrdersController.getUserOrders
);


export default router;
