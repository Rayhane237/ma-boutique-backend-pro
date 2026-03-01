import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
      firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true },
    subject:   { type: String, required: true },
    message:   { type: String, required: true },
    read:      { type: Boolean, default: false }, // for your admin later
  },
  { timestamps: true }
)
export default mongoose.model('Message', messageSchema)