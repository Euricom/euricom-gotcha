import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AttemptService {
  constructor(
    @InjectModel('Attempt') private AttemptModel: Model<any>,
    private readonly userService: UserService,
  ) {}

  async getAttemptByTargetId(id) {
    const attempts = await this.AttemptModel.find({ target: id });

    const uncheckedAttempts = attempts.filter((attempt) => !attempt?.isChecked);

    return uncheckedAttempts;
  }

  async getAllAttempts() {
    const attempts = await this.AttemptModel.find().populate([
      'target',
      'killer',
    ]);
    const uncheckedAttempts = attempts.filter(
      (attempt) => attempt?.isChecked && attempt?.approved,
    );

    return uncheckedAttempts;
  }

  async addAttempt(id, imageId, { answer, killer }) {
    const target = await this.userService.getTarget(id);

    const uncheckedAttempts = await this.getAttemptByTargetId(target._id);

    if (uncheckedAttempts.length > 0) {
      throw new BadRequestException('The target already has an attempt on him');
    }

    const newAttempt = new this.AttemptModel({
      target,
      imageId,
      answer,
      killer,
    });
    return await newAttempt.save();
  }

  async updateAttempt(approved, id) {
    const attempt = await this.AttemptModel.findById(id);

    if (approved) {
      const user = await this.userService.getTarget(attempt.target._id);
      user.killed = true;
      user.save();
    }

    attempt.approved = approved;
    attempt.approveDate = new Date();
    attempt.isChecked = true;
    attempt.save();
  }
}
