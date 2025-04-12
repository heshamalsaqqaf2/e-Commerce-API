import jwt from 'jsonwebtoken';
import config from '../config/server.config.js';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(401).json({ error: 'Access denied cookies' });
  console.log('accessToken', accessToken);
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    req.user = jwt.verify(token, config.jwt.secret);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
