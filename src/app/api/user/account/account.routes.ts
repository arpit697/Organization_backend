import {Router} from 'express';
import {accountController} from './account.controller';

import {userValidators} from './account.validators';
import {extractClientDetails} from '../../../middlewares/client-details';
import {session} from '../../../middlewares/session';
import {UserType} from '../../../constants/user.type.constants';

const accountRouter: Router = Router();

accountRouter.post('/login', userValidators.login, extractClientDetails, accountController.login);

accountRouter.post('/signup', userValidators.signup, extractClientDetails, accountController.signup);

const secureRouter: Router = Router();
secureRouter.route('/profile').get(accountController.profile).patch(userValidators.profile, accountController.update);

accountRouter.use(session([UserType.USER]), secureRouter);

export const accountRoutes = {path: '/account', accountRouter};
