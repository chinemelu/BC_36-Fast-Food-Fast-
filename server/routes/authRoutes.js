import express from 'express';
import signupValidator from '../middleware/signupValidator';
import loginValidator from '../middleware/loginValidator';
import SignupController from '../controllers/userController/SignupController';
import LoginController from '../controllers/userController/LoginController';

const router = express.Router();

router.post('/signup', signupValidator, SignupController.signup);

router.post('/login', loginValidator, LoginController.login);


export default router;
