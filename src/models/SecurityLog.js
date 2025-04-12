import mongoose  from "mongoose";



const securityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['login', 'password_change', '2fa_enabled'],
    required: true
  },
  deviceInfo: mongoose.Schema.Types.Mixed,
  location: {
    ip: String,
    city: String,
    country: String
  }
}, { timestamps: true });

export default mongoose.model('SecurityLog', securityLogSchema);