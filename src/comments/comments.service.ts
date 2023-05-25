import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../schemas/comment.schema';
import { Posts } from '../schemas/post.schema';

import { dataCreateCommentDTO } from 'src/dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Posts.name) private postModel: Model<Posts>,
  ) {}

  async addComment(dataComment: dataCreateCommentDTO) {
    const addComment = await this.commentModel.create(dataComment);
    const postParent = await this.postModel.findById(dataComment.post);

    if (postParent) {
      postParent.comments.push(addComment.id);
    } else throw new ConflictException('Error al crear el comentario');
    addComment.save();
    postParent.save();

    return addComment;
  }
}
