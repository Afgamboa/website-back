import { Document } from "mongoose";

export interface Posts extends Document {
    content: string;
    author: string;
    comments: string[];
    createdAt: Date;
}