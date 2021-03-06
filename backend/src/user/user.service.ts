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

  // Fetch the current user's data
  async getCurrentUser(id) {
    return this.UserModel.findOne({ _id: id }).populate('target', [
      'userName',
      'question',
    ]);
  }

  // Fetch the Users target
  async getTarget(id) {
    return await this.UserModel.findOne(
      { target: id },
      { userName: 1, question: 1 },
    );
  }

  async getAlivePlayers() {
    const playing = await this.UserModel.find({ killed: false });
    // Only return something if there is 1 player left
    if (playing.length > 1) {
      return [];
    }
    return playing;
  }

  // Check if user exists, if not we add him to our app
  async addUser({ userName, email }) {
    let user = await this.UserModel.findOne({ email }).populate('target', [
      'userName',
      'question',
    ]);

    if (!user) {
      // throw new BadRequestException('User does not exist');
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

  // Kill/Gotcha the current users target
  async killTarget(id) {
    const user = await this.UserModel.findById(id);
    const targetId = user?.target?._id;
    if (!targetId) {
      throw new BadRequestException('No id passed to be killed');
    }
    const target = await this.UserModel.findById(targetId);

    user.target = target.target;
    user.save();
  }

  // Add our list of users from azure to our database
  async addUsers(users: any[]) {
    users.forEach((user: any) => {
      this.addUser({ userName: user.displayName, email: user.mail });
    });
  }

  // Get a numbers of playing and dead users
  async getFeedCount() {
    const killCountPromise = this.UserModel.countDocuments({ killed: true });
    const aliveCountPromise = this.UserModel.countDocuments({ killed: false });
    const [killCount, aliveCount] = await Promise.all([
      killCountPromise,
      aliveCountPromise,
    ]);

    return { playing: aliveCount, found: killCount };
  }

  // Fetch users from Azure group to our apps database
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

  async assignTargets() {
    const users = await this.UserModel.find();

    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return [...arr];
    }

    const shuffledArray = shuffleArray(users);

    shuffledArray.forEach((user, index) => {
      if (index === shuffledArray.length - 1) {
        user.target = shuffledArray[0];
        return;
      }

      user.target = shuffledArray[index + 1]._id;
      user.save();
    });
  }
}
