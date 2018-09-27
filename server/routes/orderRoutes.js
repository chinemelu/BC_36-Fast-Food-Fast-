import express from 'express';
import PlaceOrderController from '../controllers/orderController/PlaceOrder';
import placeOrderValidator from '../middleware/placeOrderValidator';
import authenticateToken from '../middleware/authenticateToken';
import doesUserExist from '../middleware/doesUserExist';
import GetAllOrdersController from '../controllers/orderController/GetAllOrders';
import isUserAdmin from '../middleware/isUserAdmin';


const router = express.Router();

router.post(
  '/', placeOrderValidator, authenticateToken, doesUserExist, PlaceOrderController.placeOrder
);

router.get(
  '/', authenticateToken, doesUserExist, isUserAdmin, GetAllOrdersController.getAllOrders
);


export default router;
