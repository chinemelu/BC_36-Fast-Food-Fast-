import express from 'express';
import orderController from '../controllers/orderController/PlaceOrder';

const router = express.Router();

router.post(
  '/', orderController.placeOrder
);


export default router;
