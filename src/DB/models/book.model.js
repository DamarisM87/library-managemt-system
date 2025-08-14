import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
   
    title: {
      type: String,
      required: true,
      minLength: 1,
    },
    author: {
      type: String,
      required: true,
      minLength: 1,
    },
    publishedYear: {
      type: Number,
      required: true,
      max: [2025]
    },
    availableCopies: {
      type: Number,
      required: true,
      default: 1
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
      
    },
  },
  { timestamps: true }
);

const bookModel = mongoose.models.Book || mongoose.model("Book", bookSchema);
export default bookModel;