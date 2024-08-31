import {Router} from 'express';
import {authenticationController} from './authentication.controller';
import {userValidators} from './authentication.validators';
import {extractClientDetails} from '../../../middlewares/client-details';
import {session} from '../../../middlewares/session';
import {UserType} from '../../../constants/user.type.constants';

const authenticationRouter: Router = Router();

authenticationRouter.post('/login', userValidators.login, extractClientDetails, authenticationController.login);
authenticationRouter.post('/logout', authenticationController.logout);
authenticationRouter.post('/renew-session', authenticationController.renew);
authenticationRouter.post('/sign-up', userValidators.signup, extractClientDetails, authenticationController.signup);


const secureRouter: Router = Router();
// secureRouter.route('/profile').get(authenticationController.profile).patch(userValidators.profile, authenticationController.update);

authenticationRouter.use(session([UserType.USER]), secureRouter);

export const authenticationRoutes = authenticationRouter;
