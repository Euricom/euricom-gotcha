import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

@Schema()
export class User {
  @ApiProperty()
  @Prop({ default: null })
  userName: string;

  @ApiProperty()
  @Prop({ default: null, unique: true })
  email: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  target: User;

  @ApiProperty()
  @Prop({ default: null })
  token: string;

  @ApiProperty()
  @Prop({ default: false })
  killed: boolean;

  @ApiProperty()
  @Prop({ default: null })
  question: string;

  @ApiProperty()
  @Prop({ default: null })
  answer: string;

  @ApiProperty()
  @Prop({ default: new Date() })
  createdAt: Date;

  @ApiProperty()
  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
