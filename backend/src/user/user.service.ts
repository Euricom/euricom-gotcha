import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<any>) {}

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
      throw new BadRequestException("You don't seem  to have any target");
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
}
