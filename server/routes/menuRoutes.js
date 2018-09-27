import express from 'express';
import authenticateToken from '../middleware/authenticateToken';
import doesUserExist from '../middleware/doesUserExist';
import isUserAdmin from '../middleware/isUserAdmin';
import addToMenuController from '../controllers/menuController/AddToMenu';
import addToMenuValidator from '../middleware/addToMenuValidator';
import getMenuController from '../controllers/menuController/GetMenu';

const router = express.Router();

router.post(
  '/', addToMenuValidator, authenticateToken, doesUserExist, isUserAdmin, addToMenuController.addItem
);

router.get(
  '/', getMenuController.getAllItems
);

export default router;

