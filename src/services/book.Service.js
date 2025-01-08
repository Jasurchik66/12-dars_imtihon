import Book from '../models/Book.js';

export class BookService {
  static async getAllBooks() {
    return await Book.find().populate('author');
  }

  static async addBook(bookData) {
    const book = new Book(bookData);
    await book.save();
    return await book.populate('author');
  }

  static async getBookStats() {
    return await Book.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          totalCopies: { $sum: "$copies" },
          availableCopies: { $sum: "$copies" }
        }
      }
    ]);
  }
}