import express from 'express';
import { register, login } from '../controllers/auth.Controller.js';
import { 
  getBooks, 
  addBook, 
  getBookStats 
} from '../controllers/book.Controller.js';
import { 
  borrowBook, 
  getMyBooks,
  getBorrowStats 
} from '../controllers/borrow.Controller.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Book routes
router.get('/books', auth, getBooks);
router.post('/books', auth, adminAuth, addBook);
router.get('/books/stats', auth, getBookStats);

// Borrow routes
router.post('/borrow/:bookId', auth, borrowBook);
router.get('/my-books', auth, getMyBooks);
router.get('/borrows/stats', auth, adminAuth, getBorrowStats);

export default router;
