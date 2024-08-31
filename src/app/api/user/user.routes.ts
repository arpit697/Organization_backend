import { Router } from 'express';
import { authenticationRoutes } from './authentication/authentication.routes';

const userRouter: Router = Router();
userRouter.use(authenticationRoutes);

export const userRoutes = userRouter;

