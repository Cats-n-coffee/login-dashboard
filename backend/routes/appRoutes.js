import express from 'express';
import { loginGet, loginPost, signUpGet, signUpPost } from '../controllers/appControllers.js';

const router = express.Router();

router.get('/', (req,res) => {
    res.redirect('/login')
});

router.get('/login', loginGet);

router.post('/login', loginPost);

router.get('/signup', signUpGet);

router.post('/signup', signUpPost);

export default router;
