import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import {  Posts } from '../schemas/post.schema'
import {  Comment } from '../schemas/comment.schema'

import { Model } from 'mongoose';
import { dataAddPostDTO } from '../dto/post.dto'


@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Posts.name) private postModel: Model<Posts>,
        @InjectModel(Comment.name) private commentModel: Model<Comment>
    ){}

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
        let removeComments;
        const removePost = await this.postModel.findById(id);
        const comments = removePost.comments;
        if(comments.length > 0){
            for(const comment of comments ){
                removeComments = await this.commentModel.findByIdAndDelete(comment.toString());
            }
            removeComments.save();
        }
        removePost.deleteOne();        
        return removePost;

    }
}
