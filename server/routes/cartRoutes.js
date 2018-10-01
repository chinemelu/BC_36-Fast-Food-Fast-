import express from 'express';
import uuidValidator from '../middleware/uuidValidator';
import addItemController from '../controllers/shoppingCartContoller/AddItem';
import removeItemController from '../controllers/shoppingCartContoller/RemoveItem';
import authenticateToken from '../middleware/authenticateToken';
import doesItemExist from '../middleware/doesItemExist';
import doesUserExist from '../middleware/doesUserExist';

const router = express.Router();

router.get('/add-to-cart/:id', uuidValidator, authenticateToken, doesUserExist, doesItemExist, addItemController.addItem);

router.get('/remove/:id', uuidValidator, authenticateToken, doesUserExist, doesItemExist, removeItemController.removeItem);


export default router;
