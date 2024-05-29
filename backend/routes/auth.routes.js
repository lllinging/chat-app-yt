import express from 'express';

import {login, logout, signup} from '../controllers/auth.controller.js';

const router = express.Router();
//when we visit this /api/auth route, we are going to call this functions
router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);


// application.use('/api/auth', router);

export default router;