import { Body, Controller, Post, Res } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { dataCreateCommentDTO } from 'src/dto/comment.dto';
import { comment } from '../interfaces/Comment.interface';

@Controller('api/comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Post('/new/:id')
  async addComment(
    @Body() dataAddComment: dataCreateCommentDTO,
    @Res() res,
  ): Promise<comment> {
    if (!dataAddComment) {
      return res
        .status(500)
        .json({ message: 'No se pudo crear el comentario' });
    }

    const addComment = await this.commentService.addComment(dataAddComment);
    if (addComment) {
      return res
        .status(200)
        .json({ message: 'comentario creado', comment: addComment });
    } else {
      return res.status(400).json({ message: 'Error al crear el comentario' });
    }
  }
}
