import express from 'express';
import { login } from '../controllers/login-controller.js';
import miscRouter from './misc-router.js';
import bookRouter from './book-router.js';

const router = express.Router();

router.post('/login', login);

router.use(miscRouter);
router.use('/books', bookRouter);

export default router;
