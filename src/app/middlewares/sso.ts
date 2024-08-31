import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '../utils/error';
// import {UserType} from '../constants/user.constants';

export function ssoMiddleware(req: any, res: Response, next: NextFunction) {
    const alloweOrigin = {
        "http://consumer.arpit.in:3020": true,
        "http://consumertwo.arpit.in:3030": true,
      };
      
      const originAppName = {
        "http://consumer.arpit.in:3020": "sso_consumer",
        "http://consumertwo.arpit.in:3030": "simple_sso_consumer"
      };
      
    const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`;
    // console.log(redirectURL , 'url')
    if (true) {
      return res.redirect(
        `http://localhost:3000/api/v1/account/login?serviceURL=${redirectURL}`
      );
    }
    next();
}
