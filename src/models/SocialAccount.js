import mongoose from 'mongoose';



const socialAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider: {
    type: String,
    enum: ['google', 'facebook', 'apple'],
    required: true
  },
  providerId: {
    type: String,
    required: true
  },
  accessToken: String,
  refreshToken: String
}, { timestamps: true });

export default mongoose.model('SocialAccount', socialAccountSchema);
