// src/modules/auth/auth.module.js
import AuthRepository from './repositories/AuthRepository.js';
import AuthService from './services/AuthService.js';

export default {
  name: 'AuthModule',
  providers: [AuthRepository, AuthService],
  exports: [AuthService]
};