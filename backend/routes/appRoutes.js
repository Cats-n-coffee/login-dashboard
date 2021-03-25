import express from 'express';
import { loginGet, loginPost, signUpGet, signUpPost, dashboardGet } from '../controllers/appControllers.js';
import { authenticateUser } from '../middleware/authentication.js';

const router = express.Router();

router.get('/', (req,res) => {
    res.redirect('/login')
});

router.get('/login', loginGet);

router.post('/login', loginPost);

router.get('/signup', signUpGet);

router.post('/signup', signUpPost);

router.get('/dashboard', authenticateUser, dashboardGet);

export default router;
