import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as msal from '@azure/msal-node';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { UserService } from './user/user.service';

dotenv.config();

const config = {
  auth: {
    clientId: process.env.MSAL_CLIENTID,
    authority: process.env.MSAL_TENANT,
    clientSecret: process.env.MSAL_SECRET,
  },
};

@Injectable()
export class TaskService {
  constructor(private userService: UserService) {}

  private readonly logger = new Logger(TaskService.name);
  private readonly cca = new msal.ConfidentialClientApplication(config);

  // Cron job does not work like this in Heroku use 'FetchAzureUsers' instead of UserService.

  // @Cron('0 0 * * *')
  // async handleCron() {
  //   const clientCredentialRequest = {
  //     scopes: ['https://graph.microsoft.com/.default'],
  //   };

  //   const response = await this.cca.acquireTokenByClientCredential(
  //     clientCredentialRequest,
  //   );

  //   try {
  //     const { data } = await axios.get(
  //       `https://graph.microsoft.com/v1.0/groups/${process.env.GROUP_ID}/members`,
  //       {
  //         headers: {
  //           Authorization: response.tokenType + ' ' + response.accessToken,
  //         },
  //       },
  //     );

  //     // console.log(data)
  //     this.userService.addUsers(data.value);
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   this.logger.debug('Azure users fetched');
  // }
}
