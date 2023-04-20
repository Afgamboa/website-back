import { Body, Controller, Post, Res } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { dataCreateCommentDTO } from 'src/dto/comment.dto';
import { comment } from '../interfaces/Comment.interface'

@Controller('api/comments')
export class CommentsController {

    constructor(private commentService: CommentsService){}

    @Post('/new')
    async addComment(@Body() dataAddComment: dataCreateCommentDTO, @Res() res): Promise<comment>{
        try {
            const addComment = await this.commentService.addComment(dataAddComment);
            return res.status(200).json({message: "comentario creado", comment: addComment})
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }

}
