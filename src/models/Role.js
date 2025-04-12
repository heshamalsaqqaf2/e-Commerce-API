import mongoose from 'mongoose';



const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['user', 'admin', 'moderator', 'creator'],
    required: true
  },
  permissions: {
    canPost: Boolean,
    canDelete: Boolean,
    canManageUsers: Boolean,
    canManageContent: Boolean
  }
});

export default mongoose.model('Role', roleSchema);