import transactionModel from "../../DB/models/transaction.model.js";
import bookModel from "../../DB/models/book.model.js";
import userModel from "../../DB/models/user.model.js";

//=========== borrow book =============
export const borrowBook = async (req, res, next) => {
    const { bookId } = req.body;
    const userId = req.user.id;

    // Validate user exists
    const user = await userModel.findById(userId);
    if (!user) {
        throw new Error("User not found", { cause: 404 });
    }

    // Validate book exists
    const book = await bookModel.findById(bookId);
    if (!book) {
        throw new Error("Book not found", { cause: 404 });
    }

    // Check availability
    if (book.availableCopies <= 0) {
        throw new Error("No copies available", { cause: 400 });
    }

    // Create transaction
    const transaction = await transactionModel.create({
        userId,
        bookId,
        status: "borrowed",
        borrowDate: new Date()
    });

    // Decrement available copies
    book.availableCopies -= 1;
    await book.save();

    return res.status(201).json({
        message: "Book borrowed successfully",
        transaction
    });
};


//=========== return book =============
export const returnBook = async (req, res, next) => {
    const { id } = req.params; // transaction id
    const userId = req.user.id;

    // Find transaction
    const transaction = await transactionModel.findOne({
        _id: id,
        userId,
        status: "borrowed"
    });

    if (!transaction) {
        throw new Error("Transaction not found or already returned", { cause: 404 });
    }

    // Update transaction
    transaction.status = "returned";
    transaction.returnDate = new Date();
    await transaction.save();

    // Increment book available copies
    const book = await bookModel.findById(transaction.bookId);
    if (book) {
        book.availableCopies += 1;
        await book.save();
    }

    return res.status(200).json({
        message: "Book returned successfully",
        transaction
    });
};
//=========== get user transactions =============
export const getUserTransactions = async (req, res, next) => {
    const userId = req.user.id;

    const transactions = await transactionModel
        .find({ userId })
        .populate("bookId", "title author publishedYear")
        .sort({ borrowDate: -1 });

    return res.status(200).json({
        message: "success",
        transactions
    });
};