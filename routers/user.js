import express from 'express';
import * as userCtrl from '../controllers/user.js';

const userRoutes = express.Router();

userRoutes.post('/signup', userCtrl.signup);
userRoutes.post('/signin', userCtrl.login);

export default userRoutes;