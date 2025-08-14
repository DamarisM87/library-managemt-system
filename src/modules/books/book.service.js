import userModel from "../../DB/models/user.model.js"
import bookModel from "../../DB/models/book.model.js";


//============addBook ===============
export const addBook = async(req, res, next) =>{
    const {title, author, publishedYear,availableCopies} = req.body;


    const user = await userModel.findById(req.user.id).lean();

    if (!user) {
      throw new Error( "User not found" );
    }


        const book = await bookModel.create({...req.body, userId: req.user.id})

    
    return res.status(201).json({message: " book created successfully ", book})
}
 

//=============get all books ==========

export const getBooks = async(req, res, next) =>{
    
    const userId =req.user.id
    const user = await userModel.findById(userId);
    
    if (!user) {
      throw new Error( "User not found" );
    }


       // Get page and limit from query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total book count for pagination info
    const totalBooks= await bookModel.countDocuments({ userId });

    // Query paginated and sorted notes
    const books = await bookModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
      books,
    });

    
}
 

//========update book ==========

export const updateBook= async(req, res, next) =>{
    
    const userId =req.user.id
    const user = await userModel.findById(userId);
    
    if (!user) {
      throw new Error( "User not found" );
    }

     const {bookId}  = req.params;

    // Ensure book exists and is owned by the user
    const book = await bookModel.findOneAndUpdate(
      { _id: bookId, userId: userId },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!book) {
      throw new Error( "Unauthorized or book not found" );
    }

    return res.status(200).json({
      message: "Book updated successfully",
      book,
    });
}

//============ delete book ==============

export const deleteBook= async(req, res, next) =>{
    
    const userId =req.user.id
    const user = await userModel.findById(userId);
    
    if (!user) {
      throw new Error( "User not found" );
    }

     const {bookId}  = req.params;

    // Ensure book exists and is owned by the user
    const book = await bookModel.findOneAndDelete(
      { _id: bookId, userId: userId },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!book) {
      throw new Error( "Unauthorized or book not found" );
    }

    return res.status(200).json({
      message: "Book deleted successfully",
      book,
    });
}


