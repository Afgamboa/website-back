import { Controller, Get, Res, Post, Body, Delete, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from '../schemas/post.schema';
import { dataAddPostDTO } from '../dto/post.dto'


@Controller('api/posts')
export class PostsController {

    constructor(private postService: PostsService){}

    @Get()
    async getPosts(@Res() res): Promise<Posts[]>{
        const posts = await this.postService.getPosts();
        if(posts.length > 0){
            return res.status(200).json(posts)
        }
        return res.status(200).json([])
    }

    @Post('/new')
    async addPost(@Body() dataAddPostDTO: dataAddPostDTO, @Res() res): Promise<Posts>{
        if(!dataAddPostDTO){
            return res.status(500).json({message: 'La publicacion no pudo ser creada'})
        }
        const newPost = await this.postService.addPost(dataAddPostDTO);
        if(newPost){
            return res.status(201).json({message: "publicacion creada correctamente", newPost: newPost})
        }else{
            return res.status(500).json({message: "la publicacion no pudo ser creada"})
        }

    }

    @Delete('/delete/:id')
    async removePost(@Param('id') postId, @Res() res): Promise<Posts>{
        const removePost = await this.postService.deletePost(postId);
        if(removePost){
            return res.status(200).json({message: "post elimindo correctamente", removePost: removePost})
        }

        return res.status(400).json({message: "error al intentar eliminar el post"})
    }
}
