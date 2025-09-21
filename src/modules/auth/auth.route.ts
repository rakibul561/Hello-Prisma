 
import express  from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post("/login", AuthController.loginWithEmailPass)
router.post("/google", AuthController.loginWithGoogle)


export const AuthRouter = router