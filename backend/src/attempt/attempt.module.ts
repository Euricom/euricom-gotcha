import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttemptSchema } from 'src/schemas/attempt.schema';
import { UserModule } from 'src/user/user.module';
import { AttemptController } from './attempt.controller';
import { AttemptService } from './attempt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Attempt', schema: AttemptSchema }]),
    UserModule,
  ],
  controllers: [AttemptController],
  providers: [AttemptService],
})
export class AttemptModule {}
