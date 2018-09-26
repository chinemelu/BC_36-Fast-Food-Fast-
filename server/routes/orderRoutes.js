import express from 'express';
import PlaceOrderController from '../controllers/orderController/PlaceOrder';
import placeOrderValidator from '../middleware/placeOrderValidator';
import authenticateToken from '../middleware/authenticateToken';
import doesUserExist from '../middleware/doesUserExist';

const router = express.Router();

router.post(
  '/', placeOrderValidator, authenticateToken, doesUserExist, PlaceOrderController.placeOrder
);


export default router;
