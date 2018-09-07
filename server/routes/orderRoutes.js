import express from 'express';
import orderController from '../controllers/orderController/placeOrder';

const router = express.Router();

router.post(
  '/', orderController.placeOrder
);


export default router;
