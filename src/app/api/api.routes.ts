import { Router } from 'express';
import './api.swagger';
import { attendanceRoute } from './attendance/attendance.routes';
import { userRoutes } from './user/user.routes';

const router: Router = Router();
router.use('/users', userRoutes);
router.use('/attendance' , attendanceRoute)

export const apiRouter = [router];
