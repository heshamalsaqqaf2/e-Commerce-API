import bcrypt from 'bcryptjs';
import IAuthService from '../interfaces/IAuthService.js';
import AuthRepository from '../repositories/AuthRepository.js';
import { generateToken } from '../../../core/utils/jwt.util.js';
import AppException from '../../../core/exceptions/AppException.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../../../core/utils/email.util.js';


class AuthService extends IAuthService {
  async register(userData) {
    const existingUser = await AuthRepository.findByEmail(userData.email);
    if (existingUser) throw new AppException('Email already exists', 409);

    const user = await AuthRepository.createUser(userData);
    await sendVerificationEmail(user.email, user.verificationToken);

    const token = generateToken({
      sub: user._id,
      roles: user.roles
    });

    return { user, token };
  }

  async login({ email, password }) {
    const user = await AuthRepository.findByEmail(email);
    if (!user) throw new AppException(`Invalid credentials email: ${email}`, 401);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new AppException('Invalid credentials password', 401);

    if (!user.isVerified) throw new AppException('Verify your email first before login', 403);

    const token = generateToken({
      sub: user._id,
      roles: user.roles
    });

    return { user, token };
  }

  async verifyEmail(token) {
    const user = await AuthRepository.verifyUser(token);
    if (!user) throw new AppException('Invalid token', 400);
    return user;
  }

  async forgotPassword(email) {
    const token = await AuthRepository.createPasswordResetToken(email);
    if (!token) throw new AppException('User not found', 404);
    await sendPasswordResetEmail(email, token);
  }

  async resetPassword(token, newPassword) {
    const user = await AuthRepository.resetPassword(token, newPassword);
    if (!user) throw new AppException('Invalid token', 400);
    return user;
  }
}

export default new AuthService();