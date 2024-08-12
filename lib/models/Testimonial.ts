import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  styles:{
    layout:{type: String, default: 'three-column-grid'},
    cardStyle: { type:String, default: 'center-items' },
    pallet:{
      name:{type:String, default: 'custom'},
      colors: {
        primary: {type:String, default: '#21b0fe'},
        text: {type:String, default: '#2b2d42'},
        bg: {type:String, default: '#ffffff'},
      }
    }
  }
});

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

export default Testimonial;
