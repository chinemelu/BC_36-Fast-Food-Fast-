import express from 'express';
import uuidValidator from '../middleware/uuidValidator';
import CartController from '../controllers/shoppingCartContoller/CartController';
import authenticateToken from '../middleware/authenticateToken';
import doesItemExist from '../middleware/doesItemExist';
import doesUserExist from '../middleware/doesUserExist';

const router = express.Router();

router.get('/add-to-cart/:id', uuidValidator, authenticateToken, doesUserExist, doesItemExist, CartController.addItem);


export default router;
