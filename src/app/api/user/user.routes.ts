import { Router } from 'express';
import { userController } from './user.controller';
import { No } from './user.controller';
const userRouter: Router = Router();
userRouter.route('/').get(userController.getUsers).post(userController.registerUser);
userRouter.route('/').delete(userController.deleteUser)
const no: Router = Router()
no.route('/').post(No.attendance)
export const userRoutes = userRouter;
export const noRoutes = no;
