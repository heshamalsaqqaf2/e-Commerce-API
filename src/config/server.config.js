import envConfig from './env.config.js';

export default {
  env: envConfig.env,
  port: envConfig.port,
  jwt: {
    secret: envConfig.jwtSecret,
    expiresIn: envConfig.jwtExpiresIn || '1h'
  },
  cors: {
    origin: envConfig.corsOrigin.split(',') || ['http://localhost:3000']
  }
};