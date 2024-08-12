import mongoose from 'mongoose';

const FaqCardSchema = new mongoose.Schema({
  faqId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faq', required: true },
  author:{ type: mongoose.Schema.Types.ObjectId, ref:'User', require: true },
  question: { type: String, required: true },
  answer: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const FaqCard = mongoose.models.FaqCard || mongoose.model('FaqCard', FaqCardSchema);

export default FaqCard;
