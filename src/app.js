import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/v1/auth.routes.js';
import { connectDB } from './core/database/database.config.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { stream } from './core/utils/logger.js';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: stream }));

// Routes
app.use('/api/v1/auth', authRoutes);

// Error handling
app.use(errorHandler);

// Database connection
connectDB();

export default app;