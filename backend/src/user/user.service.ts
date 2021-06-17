import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import * as msal from '@azure/msal-node';
import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  auth: {
    clientId: process.env.MSAL_CLIENTID,
    authority: process.env.MSAL_TENANT,
    clientSecret: process.env.MSAL_SECRET,
  },
};

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<any>) {}

  private readonly logger = new Logger('UserService');
  private readonly cca = new msal.ConfidentialClientApplication(config);

  async getCurrentUser(id) {
    return await this.UserModel.findOne({ id }).populate('target', [
      'userName',
      'question',
    ]);
  }

  async getTarget(id) {
    return await this.UserModel.findOne(
      { _id: id },
      { userName: 1, question: 1 },
    );
  }

  async addUser({ userName, email }) {
    let user = await this.UserModel.findOne({ email }).populate('target', [
      'userName',
      'question',
    ]);

    if (!user) {
      const newUser = new this.UserModel({
        userName,
        email,
      });
      await newUser.save();

      user = await this.UserModel.findById(newUser._id).populate('target', [
        'userName',
        'question',
      ]);
    }

    return user;
  }

  async killTarget(id) {
    const user = await this.UserModel.findById(id);
    const targetId = user?.target?._id;
    if (!targetId) {
      throw new BadRequestException('No id passed to be killed');
    }
    const target = await this.UserModel.findById(targetId);
    target.killed = true;
    target.save();

    user.target = target.target;
    user.save();
  }

  async addUsers(users: any[]) {
    users.forEach((user: any) => {
      this.addUser({ userName: user.displayName, email: user.mail });
    });
  }

  async getFeedCount() {
    const users = await this.UserModel.find();
    let killCount = 0;
    let aliveCount = 0;

    users.forEach((user: any) => {
      if (user.killed) {
        killCount++;
      } else {
        aliveCount++;
      }
    });

    return { playing: aliveCount, found: killCount };
  }

  async fetchAzureUsers() {
    const clientCredentialRequest = {
      scopes: ['https://graph.microsoft.com/.default'],
    };

    const response = await this.cca.acquireTokenByClientCredential(
      clientCredentialRequest,
    );

    try {
      const { data } = await axios.get(
        `https://graph.microsoft.com/v1.0/groups/${process.env.GROUP_ID}/members`,
        {
          headers: {
            Authorization: response.tokenType + ' ' + response.accessToken,
          },
        },
      );

      this.addUsers(data.value);
    } catch (err) {
      console.log(err);
    }

    this.logger.debug('Azure users fetched');
  }
}
