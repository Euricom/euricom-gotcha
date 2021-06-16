import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AttemptModule } from './attempt/attempt.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { AuthModule } from './auth/auth.module';
dotenv.config();

@Module({
  imports: [
    UserModule,
    AttemptModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL, { useFindAndModify: false }),
    AuthModule,
  ],
  controllers: [],
  providers: [TaskService],
})
export class AppModule {}
