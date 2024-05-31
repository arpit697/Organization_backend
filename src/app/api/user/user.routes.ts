import { Router } from 'express';
import { userController } from './user.controller';

const userRouter: Router = Router();
userRouter.route('/').get(userController.getUsers).post(userController.registerUser);
userRouter.route('/').delete(userController.deleteUser)

export const userRoutes = userRouter;

