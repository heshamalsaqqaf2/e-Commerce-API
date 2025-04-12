import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

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

// Swagger
const swaggerFilePath = path.resolve('src', 'swagger.json');
let swaggerDocument;
try {
    swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf-8'));
} catch (error) {
    console.error('Failed to load Swagger document:', error.message);
    process.exit(1);
}

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling
app.use(errorHandler);

// Database connection
connectDB();

export default app;