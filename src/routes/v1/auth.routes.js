import express from 'express';
import Joi from 'joi';
import AuthController from '../../modules/auth/controllers/AuthController.js';
import { validate } from '../../middlewares/validation.middleware.js';
import {
    registerSchema,
    loginSchema,
    resetPasswordSchema
} from '../../validators/auth.validator.js';

const router = express.Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.get('/verify/:token', AuthController.verifyEmail);
router.post('/forgot-password', validate({ email: Joi.string().email().required() }), AuthController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), AuthController.resetPassword);

export default router;