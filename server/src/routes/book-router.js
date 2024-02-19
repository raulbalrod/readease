import { Router } from 'express';
import { createBookController, deleteBookController, getAllBooks, getBook, updateBook } from '../controllers/book-controller.js';

const router = Router();

router.get('/', getAllBooks);
router.get('/:title', getBook);
router.post('/', createBookController);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBookController);

export default router;
