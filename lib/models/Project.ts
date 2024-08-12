import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  url: {type: String, required: true },
  description: { type: String, default: '' }, 
  logo: { type: String, default: '' },
  components: {
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    testimonials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Testimonial' }],
    faqs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Faq' }],
  },
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now }, 
});



const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;
