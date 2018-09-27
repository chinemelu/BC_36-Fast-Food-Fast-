import express from 'express';
import PlaceOrderController from '../controllers/orderController/PlaceOrder';
import placeOrderValidator from '../middleware/placeOrderValidator';
import authenticateToken from '../middleware/authenticateToken';
import doesUserExist from '../middleware/doesUserExist';
import GetAllOrdersController from '../controllers/orderController/GetAllOrders';
import GetSingleOrderController from '../controllers/orderController/GetSingleOrder';
import isUserAdmin from '../middleware/isUserAdmin';
import UpdateOrderStatusController from '../controllers/orderController/UpdateOrderStatus';
import orderStatusValidator from '../middleware/orderStatusValidator';
import uuidValidator from '../middleware/uuidValidator';


const router = express.Router();

router.post(
  '/', placeOrderValidator, authenticateToken, doesUserExist, PlaceOrderController.placeOrder
);

router.get(
  '/', authenticateToken, doesUserExist, isUserAdmin, GetAllOrdersController.getAllOrders
);

router.put(
  '/:id', uuidValidator, orderStatusValidator, authenticateToken, doesUserExist, isUserAdmin, UpdateOrderStatusController.updateOrderStatus
);

router.get(
  '/:id', uuidValidator, authenticateToken, doesUserExist, isUserAdmin, GetSingleOrderController.getSingleOrder
);

export default router;
