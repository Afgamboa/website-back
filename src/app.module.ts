import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, PostsModule, CommentsModule, MongooseModule.forRoot('mongodb://localhost:27017/website'), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
