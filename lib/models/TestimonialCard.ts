import mongoose from 'mongoose';

const TestimonialCardSchema = new mongoose.Schema({
  testimonialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Testimonial', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref:'User', require: true },
  rating: { type: Number, require: true, default: 0},
  content: { type: String, defult: '' },
  createdAt: { type: Date, default: Date.now },
});

const TestimonialCard = mongoose.models.TestimonialCard || mongoose.model('TestimonialCard', TestimonialCardSchema);

export default TestimonialCard;
