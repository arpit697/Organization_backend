import { Router } from 'express';
import { testingController } from './testing.controller';


const testingRouter: Router = Router();
testingRouter.route('/').get(testingController.getWeatherData).post(testingController.addWeatherData);


export const testingRoutes = testingRouter;
