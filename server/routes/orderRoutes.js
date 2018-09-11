import express from 'express';
import CartController from '../controllers/shoppingCartContoller/CartController';

const router = express.Router();

router.get(
  '/', CartController.fetchAllOrders
);

router.post(
  '/', CartController.placeOrder
);

export default router;
