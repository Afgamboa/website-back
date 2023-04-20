import { Document } from "mongoose";
export interface comment extends Document {
    content: String;
    author: String;
    post: String;
}