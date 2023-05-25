import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Users } from './user.schema';
import { Posts } from './post.schema';

@Schema({ collection: 'Comments' })
export class Comment {
  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  author: Users;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Posts', required: true })
  post: Posts;

  //@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  @Prop()
  childrenComments: Comment[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const commentSchema = SchemaFactory.createForClass(Comment);
