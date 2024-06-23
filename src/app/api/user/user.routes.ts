import { Router } from 'express';
import { userController } from './user.controller';
import { accountRoutes } from './account/account.routes';

const userRouter: Router = Router();
// userRouter.route('/').get(userController.getUsers).post(userController.registerUser);
// userRouter.route('/').post(userController.registerUser);
// userRouter.route('/').delete(userController.deleteUser)
userRouter.use(accountRoutes.path, accountRoutes.accountRouter);

export const userRoutes = userRouter;

