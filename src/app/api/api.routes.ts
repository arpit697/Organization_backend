import { Router } from 'express';
import './api.swagger';
import { userRoutes } from './user/user.routes';

const router: Router = Router();

router.use('/users', userRoutes);
export const apiRouter = router;
