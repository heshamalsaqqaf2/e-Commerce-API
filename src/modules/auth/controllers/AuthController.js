// src/modules/auth/controllers/AuthController.js
import AuthService from '../services/AuthService.js';
import AuthDTO from '../../../dtos/auth.dto.js';
import ApiResponse from '../../../core/utils/apiResponse.js';

class AuthController {
  async register(req, res) {
    try {
      const { user, token } = await AuthService.register(req.body);
      ApiResponse.success(res, { user: new AuthDTO(user), token }, 201);
    } catch (error) {
      ApiResponse.error(res, error.message, error.statusCode);
    }
  }

  async login(req, res) {
    try {
      const { user, token } = await AuthService.login(req.body);
      ApiResponse.success(res, { user: new AuthDTO(user), token });
    } catch (error) {
      ApiResponse.error(res, error.message, error.statusCode);
    }
  }

  async verifyEmail(req, res) {
    try {
      const user = await AuthService.verifyEmail(req.params.token);
      ApiResponse.success(res, new AuthDTO(user));
    } catch (error) {
      ApiResponse.error(res, error.message, error.statusCode);
    }
  }

  async forgotPassword(req, res) {
    try {
      await AuthService.forgotPassword(req.body.email);
      ApiResponse.success(res, 'Reset email sent');
    } catch (error) {
      ApiResponse.error(res, error.message, error.statusCode);
    }
  }

  async resetPassword(req, res) {
    try {
      const user = await AuthService.resetPassword(req.body.token, req.body.newPassword);
      ApiResponse.success(res, new AuthDTO(user));
    } catch (error) {
      ApiResponse.error(res, error.message, error.statusCode);
    }
  }
}

export default new AuthController();