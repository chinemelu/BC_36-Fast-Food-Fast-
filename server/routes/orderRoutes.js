import express from 'express';
import OrderController from '../controllers/orderController/OrderController';
import idValidator from '../middleware/idValidator';

const router = express.Router();

router.get(
  '/', OrderController.fetchAllOrders
);

router.get(
  '/:id', idValidator, OrderController.fetchOrder
);

router.put(
  '/:id', idValidator, OrderController.updateOrderStatus
);

router.post(
  '/', OrderController.placeOrder
);

export default router;
