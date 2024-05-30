import { Router } from 'express';
import { userController } from './user.controller';
const userRouter: Router = Router();
userRouter.route('/').get(userController.getUsers).post(userController.registerUser);
userRouter.route('/').delete(userController.deleteUser)
const No: Router = Router()
No.route('/').get(No)
export const userRoutes = userRouter;
