import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OIDCBearerStrategy } from 'passport-azure-ad';

import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class FacebookStrategy extends PassportStrategy(
  OIDCBearerStrategy,
  'azure',
) {
  constructor() {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
    });
  }

  async validate(
    token,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    //   findById(token.oid, function(err, user) {
    //     if (err) {
    //       return done(err);
    //     }
    //     if (!user) {
    //       // "Auto-registration"
    //       users.push(token);
    //       owner = token.oid;
    //       return done(null, token);
    //     }
    //     owner = token.oid;
    //     return done(null, user, token);
    //     });
  }
}
