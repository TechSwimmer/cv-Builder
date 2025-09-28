import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { register, login, getUserProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user',protect, getUserProfile);


export default router;
