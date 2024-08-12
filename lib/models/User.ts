import mongoose, { Schema, Document } from 'mongoose';


const UserSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    onboarded: { type: Boolean, default: false },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }], // Reference to Project schema
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
