import User from '../../../models/User.js';
import IAuthRepository from '../interfaces/IAuthRepository.js';
import crypto from 'crypto';
import Session from '../../../models/Session.js';

class AuthRepository extends IAuthRepository {
  async createUser(userData) {
    const verificationToken = crypto.randomBytes(20).toString('hex');
    return User.create({ ...userData, verificationToken });
  }

  async findByEmail(email) {
    return User.findOne({ email }).select('+password');
  }

  async verifyUser(token) {
    const user = await User.findOne({ verificationToken: token });
    if (!user) return null;
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    return user;
  }

  async createPasswordResetToken(email) {
    const user = await User.findOne({ email });
    if (!user) return null;
    user.passwordResetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetExpires = Date.now() + 3600000;
    await user.save();
    return user.passwordResetToken;
  }

  async resetPassword(token, newPassword) {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) return null;
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return user;
  }

  async createSession(userId, sessionData) {
    const user = await User.findById(userId);
    if (!user) return null; 
    return Session.create(sessionData);
  }


}

export default new AuthRepository();