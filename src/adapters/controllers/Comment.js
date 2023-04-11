import {Comment, Reply} from "../../domian/model/Comment.js"

const createComment = async (req, res) => {
  const { post, author, content } = req.body.comment;
  try {
    const newComment = await Comment.create({ post, author, content });
    res.status(201).json({ comment: newComment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating comment' });
  }
};

const getComments = async (req, res) => {
  try {
    const id = req.params.postId;
    const comments = await Comment.find({ post: id })
    .populate('childrenComments')
    .populate({ path: 'author', select: 'username' });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting posts' });
  }
};

const editComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    res.status(200).json({ comment: updatedComment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating comment' });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  console.log("first", req.params);
  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

const replyComment = async (req, res) => {
  try {
    const { content, userId } = req.body;
    const newReply = new Reply({
      content,
      author: userId,
      parentComment: req.params.commentId,
    });

    // Guardar el comentario en la base de datos
    const sevedReply = await newReply.save();
    const parentComment = await Comment.findById(req.params.commentId);
    parentComment.childrenComments.push(sevedReply._id);

    await parentComment.save();
    console.log("set", parentComment)
    res.json(sevedReply);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error responding to comment' });
  }
};

export {
  createComment,
  editComment,
  deleteComment,
  replyComment,
  getComments,
};
