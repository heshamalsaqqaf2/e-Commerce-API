import cors from 'cors';

export default cors({
  origin: typeof process.env.CORS_ORIGIN === 'string'
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:3000'],
  credentials: true
});
