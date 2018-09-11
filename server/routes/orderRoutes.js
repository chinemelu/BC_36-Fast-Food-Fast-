import express from 'express';
import CartController from '../controllers/shoppingCartContoller/CartController';

const router = express.Router();

router.post(
  '/', CartController.placeOrder
);


export default router;
