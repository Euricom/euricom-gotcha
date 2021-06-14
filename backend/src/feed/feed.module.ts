import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedSchema } from 'src/schemas/feed.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Feed', schema: FeedSchema }])],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
