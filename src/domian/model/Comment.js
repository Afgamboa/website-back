import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  childrenComments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
},{ collection: 'Comments' });

const ReplySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true
  },
  childrenReplys: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
},{ collection: 'Replys' });

const Comment = mongoose.model('Comment', commentSchema);
const Reply = mongoose.model('Reply', ReplySchema);


export { Comment, Reply };


