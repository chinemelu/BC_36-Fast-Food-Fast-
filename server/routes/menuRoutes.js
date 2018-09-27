import express from 'express';
import authenticateToken from '../middleware/authenticateToken';
import doesUserExist from '../middleware/doesUserExist';
import isUserAdmin from '../middleware/isUserAdmin';
import addToMenuController from '../controllers/menuController/AddToMenu';
import addToMenuValidator from '../middleware/addToMenuValidator';

const router = express.Router();

router.post(
  '/', addToMenuValidator, authenticateToken, doesUserExist, isUserAdmin, addToMenuController.addItem
);


export default router;
