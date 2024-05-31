import { Router } from 'express';
import './api.swagger';
import { userRoutes } from './user/user.routes';
import { attendanceRoute } from './attendance/attendance.routes';

const router: Router = Router();
// router.use('/users', userRoutes);
router.use('/attendance' , attendanceRoute)

export const apiRouter = [router];
