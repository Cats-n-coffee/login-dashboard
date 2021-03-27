import express from 'express';
import { loginPost, signUpPost, dashboardGet, logoutGet, refreshTokenPost } from '../controllers/appControllers.js';
import { authenticateUser } from '../middleware/authentication.js';

const router = express.Router();

router.post('/login', loginPost);

router.post('/signup', signUpPost);

router.get('/dashboard', authenticateUser, dashboardGet);

router.get('/logout', logoutGet);

router.post('/refreshtoken', refreshTokenPost)

export default router;
