import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, postSchema } from '../schemas/post.schema';
import { Comment, commentSchema } from '../schemas/comment.schema';
import { Users, userSchema } from '../schemas/user.schema';



@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Posts.name, schema: postSchema},
      {name: Comment.name, schema: commentSchema},
      {name: Users.name, schema: userSchema}
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
