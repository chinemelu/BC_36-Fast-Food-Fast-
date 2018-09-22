import express from 'express';
import signupValidator from '../middleware/signupValidator';
import SignupController from '../controllers/userController/SignupController';

const router = express.Router();

router.post('/signup', signupValidator, SignupController.signup);

export default router;
