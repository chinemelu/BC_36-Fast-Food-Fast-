import express from 'express';
import authenticateToken from '../middleware/authenticateToken';
import doesUserExist from '../middleware/doesUserExist';
import doesItemExist from '../middleware/doesItemExist';
import isUserAdmin from '../middleware/isUserAdmin';
import addToMenuController from '../controllers/menuController/AddToMenu';
import addToMenuValidator from '../middleware/addToMenuValidator';
import getMenuController from '../controllers/menuController/GetMenu';
import deleteFromMenuController from '../controllers/menuController/DeleteFoodItem';
import editItemValidator from '../middleware/editItemValidator';
import editMenuItemController from '../controllers/menuController/EditMenuItem';
import getItemController from '../controllers/menuController/GetFoodItem';
import uuidValidator from '../middleware/uuidValidator';


const router = express.Router();

router.post(
  '/', addToMenuValidator, authenticateToken, doesUserExist, isUserAdmin, addToMenuController.addItem
);

router.get(
  '/', getMenuController.getAllItems
);

router.delete(
  '/:id', uuidValidator, authenticateToken, doesUserExist, doesItemExist, isUserAdmin, deleteFromMenuController.deleteItem
);

router.put(
  '/:id', uuidValidator, authenticateToken, doesUserExist, doesItemExist, editItemValidator, isUserAdmin, editMenuItemController.editItem
);

router.get(
  '/:id', uuidValidator, authenticateToken, doesUserExist, isUserAdmin, getItemController.getItem
);


export default router;
