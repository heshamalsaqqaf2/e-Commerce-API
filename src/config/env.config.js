import dotenv from 'dotenv';
dotenv.config();

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  appUrl: process.env.APP_URL,
  mongodbUri: process.env.MONGODB_URI,
  corsOrigin: process.env.CORS_ORIGIN,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
};