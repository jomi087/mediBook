import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest.js';
import { signinSchema, signupSchema } from '../validations/authSchema.js';
import { AuthController } from '../controllers/AuthController.js';
import { AuthService } from '../service/AuthService.js';
import { AuthRepository } from '../repositories/AuthRepository.js';
import { authenticate } from '../middleware/authenticate.js';

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);
const router = Router();

router.get('/me', authenticate , authController.accountInfo)
router.post('/signup', validateRequest(signupSchema), authController.signup)
router.post('/signin', validateRequest(signinSchema), authController.signin)

export default router