import { Router } from 'express';
import './api.swagger';
import { noRoutes, userRoutes } from './user/user.routes';

const router: Router = Router();

router.use('/attendance' , noRoutes)
router.use('/users', userRoutes);

export const apiRouter = router;
