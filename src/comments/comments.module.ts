import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, commentSchema } from '../schemas/comment.schema';
import { Posts, postSchema } from '../schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Comment.name, schema: commentSchema},
      {name: Posts.name, schema: postSchema}

    ])
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
