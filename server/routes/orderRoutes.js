import express from 'express';
import CartController from '../controllers/shoppingCartContoller/CartController';
import OrderController from '../controllers/orderController/OrderController';
import idValidator from '../middleware/idValidator';

const router = express.Router();

router.get(
  '/', CartController.fetchAllOrders
);

router.get(
  '/:id', idValidator, OrderController.fetchOrder
);

router.post(
  '/', CartController.placeOrder
);

export default router;
