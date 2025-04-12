import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
  },
  phone: {
    type: String,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  profile: {
    fullName: String,
    avatar: String,
    bio: String,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    birthdate: Date
  },
  socialAccounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SocialAccount'
  }],
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }],
  settings: {
    isPrivate: {
      type: Boolean,
      default: false
    },
    twoFactorAuth: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'en'
    },
    notificationPreferences: {
      email: Boolean,
      push: Boolean,
      sms: Boolean
    }
  },
  stats: {
    followers: {
      type: Number,
      default: 0
    },
    following: {
      type: Number,
      default: 0
    },
    posts: {
      type: Number,
      default: 0
    }
  },
  security: {
    emailVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lastPasswordChange: Date
  },
  status: {
    isActive: {
      type: Boolean,
      default: true
    },
    isBanned: {
      type: Boolean,
      default: false
    }
  }
}, { timestamps: true });


//إضافة الفهارس  Indexing
// userSchema.index({ email: 1 }, { unique: true, sparse: true });
// userSchema.index({ phone: 1 }, { unique: true, sparse: true });


// تشفير الباسورد قبل الحفظ
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default  mongoose.model('User', userSchema);