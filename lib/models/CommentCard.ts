import mongoose from 'mongoose';

const CommentCardSchema = new mongoose.Schema({
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
  author:{ type: mongoose.Schema.Types.ObjectId, ref:'User', require: true },
  content: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const CommentCard = mongoose.models.CommentCard || mongoose.model('CommentCard', CommentCardSchema);

export default CommentCard;
