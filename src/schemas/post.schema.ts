import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Users } from './user.schema';

@Schema({ collection: 'Post' })
export class Posts {
  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  author: Users;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const postSchema = SchemaFactory.createForClass(Posts);
