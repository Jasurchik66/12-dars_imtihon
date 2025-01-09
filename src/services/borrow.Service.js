import Book from '../models/Book.js';
import Borrow from '../models/Borrow.js';

export class BorrowService {
  static async borrowBook(userId, bookId) {
  
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error('Book not found');
    }

    if (book.copies < 1) {
      throw new Error('No copies available');
    }

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 14);

    const borrow = new Borrow({
      user: userId,
      book: bookId,
      returnDate
    });

    await borrow.save();

    book.copies -= 1;
    await book.save();

    return await borrow.populate('book');
  }

  static async getMyBooks(userId) {
    return await Borrow.find({ user: userId })
      .populate({
        path: 'book',
        populate: {
          path: 'author'
        }
      });
  }

  static async getBorrowStats() {
    return await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'book'
        }
      }
    ]);
  }
}
