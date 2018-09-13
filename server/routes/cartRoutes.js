import express from 'express';
import CartController from '../controllers/shoppingCartContoller/CartController';
import idValidator from '../middleware/idValidator';

const router = express.Router();

router.get(
  '/add-to-cart/:id', idValidator, CartController.addItem
);

router.get(
  '/remove/:id', idValidator, CartController.removeItem
);

router.put(
  '/update-quantity/:id', idValidator, CartController.updateItemQuantity
);

export default router;
