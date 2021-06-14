import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Feed {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  target: User;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  killer: User;

  @ApiProperty()
  @Prop({ default: null })
  killDate: Date;
}

export const FeedSchema = SchemaFactory.createForClass(Feed);
