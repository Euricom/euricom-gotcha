import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AttemptService {
  constructor(
    @InjectModel('Attempt') private AttemptModel: Model<any>,
    private readonly userService: UserService,
    private cloudinary: CloudinaryService,
  ) {}

  // Get all unchecked attempts on the current user
  async getAttemptByTargetId(id) {
    const attempts = await this.AttemptModel.find({ target: id });

    const uncheckedAttempts = attempts.filter((attempt) => !attempt?.isChecked);

    return uncheckedAttempts;
  }

  // Get all approved attempts to display in our feed
  async getAllAttempts() {
    const attempts = await this.AttemptModel.find(
      {},
      {},
      { sort: '-approveDate' },
    ).populate(['target', 'killer']);
    const uncheckedAttempts = attempts.filter(
      (attempt) => attempt?.isChecked && attempt?.approved,
    );

    return uncheckedAttempts;
  }

  // Create a new attempt on a target
  async addAttempt(id, file, { answer, killer }) {
    const user = await this.userService.getCurrentUser(id);
    const target = user?.target;
    const uncheckedAttempts = await this.getAttemptByTargetId(target._id);

    // Check if our current target already has active attempts on him, if so cancel new attempts
    if (uncheckedAttempts.length > 0) {
      throw new BadRequestException('The target already has an attempt on him');
    }

    const uploadedFile = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });

    const newAttempt = new this.AttemptModel({
      target,
      imageUrl: uploadedFile.url,
      answer,
      killer,
    });
    return await newAttempt.save();
  }

  // Approve or decline attempts on our user
  async updateAttempt(approved, id) {
    const attempt = await this.AttemptModel.findById(id).populate([
      'target',
      'killer',
    ]);

    if (approved) {
      const target = await this.userService.getCurrentUser(
        attempt?.target?._id,
      );
      const killer = await this.userService.getCurrentUser(
        attempt?.killer?._id,
      );
      target.killed = true;
      target.save();
      killer.target = attempt.target._id;
      killer.save();
    }

    attempt.approved = approved;
    attempt.approveDate = new Date();
    attempt.isChecked = true;
    attempt.save();
  }
}
