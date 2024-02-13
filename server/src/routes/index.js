import express from 'express';
import { login } from '../controllers/login-controller.js';
import miscRouter from './misc-router.js';

const router = express.Router();

router.post('/login', login);

router.use(miscRouter);

export default router;
