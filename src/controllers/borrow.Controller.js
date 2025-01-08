import { BorrowService } from '../services/borrow.Service.js';

export const borrowBook = async (req, res) => {
  try {
    const result = await BorrowService.borrowBook(req.user.userId, req.params.bookId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMyBooks = async (req, res) => {
  try {
    const books = await BorrowService.getMyBooks(req.user.userId);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBorrowStats = async (req, res) => {
  try {
    const stats = await BorrowService.getBorrowStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};