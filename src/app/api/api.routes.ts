import { Router } from 'express';
import './api.swagger';
import { attendanceRoute } from './attendance/attendance.routes';
import { userRoutes } from './user/user.routes';
import { testingRoutes } from './testing/testing.routes';

const router: Router = Router();
router.use('/users', userRoutes);
// router.use('/attendance' , attendanceRoute)
router.use('/weather' , testingRoutes)


export const apiRouter = [router];
