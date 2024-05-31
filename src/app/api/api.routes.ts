import { Router } from 'express';
import './api.swagger';
import { noRoutes, userRoutes } from './user/user.routes';

const router: Router = Router();
const attendRouter : Router = Router()
router.use('/users', userRoutes);
router.use('/attendance' , noRoutes);

export const apiRouter = [router , attendRouter];
