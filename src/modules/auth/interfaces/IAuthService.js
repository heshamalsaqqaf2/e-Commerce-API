export default class IAuthService {
  // Service interface
  register(_userData) { }
  login(_email, _password) { }
  verifyEmail(_token) { }
  forgotPassword(_email) { }
  resetPassword(_token, _newPassword) { }
  refreshToken(_refreshToken) { }
}