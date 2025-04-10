﻿import jwt from 'jsonwebtoken';
import config from '../../config/server.config.js';

export const generateToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};