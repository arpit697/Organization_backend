import { Router } from 'express';
import './api.swagger';
import { userRoutes } from './user/user.routes';

import { authenticationRoutes } from './user/authentication/authentication.routes';

const router: Router = Router();
router.use('/users', userRoutes);
router.use('/', authenticationRoutes);
// router.use('/attendance' , attendanceRoute)
// router.use('/pdf' , testingRoutes)


export const apiRouter = [router];
