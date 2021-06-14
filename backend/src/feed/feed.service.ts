import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FeedService {
  constructor(@InjectModel('Feed') private FeedModel: Model<any>) {}

  getFeed() {
    return this.FeedModel.find();
  }
}
