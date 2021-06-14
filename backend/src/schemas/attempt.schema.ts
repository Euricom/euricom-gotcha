import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Attempt {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  target: User;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  killer: User;

  @ApiProperty()
  @Prop({ default: null })
  imageId: string;

  @ApiProperty()
  @Prop({ default: null })
  answer: string;

  @ApiProperty()
  @Prop({ default: null })
  approved: boolean;

  @ApiProperty()
  @Prop({ default: false })
  isChecked: boolean;

  @ApiProperty()
  @Prop({ default: new Date() })
  submitDate: Date;

  @ApiProperty()
  @Prop({ default: null })
  approveDate: Date;
}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
