import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import {  Posts } from '../schemas/post.schema'
import { Model } from 'mongoose';
import { dataAddPostDTO } from '../dto/post.dto'


@Injectable()
export class PostsService {

    constructor(@InjectModel(Posts.name) private postModel: Model<Posts>){}

    async addPost(dataAddPostDTO: dataAddPostDTO){
        const newPost = await this.postModel.create(dataAddPostDTO);
        newPost.save();
        return newPost;
    }

    async getPosts(){
        const posts = await this.postModel.find().populate('author','username').populate('comments')
        return posts;
    }

    async deletePost(id: string){
        const removePost = await this.postModel.findByIdAndDelete(id);
        return removePost;

    }
}
