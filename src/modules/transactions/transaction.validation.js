import joi from "joi";
import { generalRules } from "../../utils/generalRules.js";

//========== Borrow Book Schema ==========
export const borrowBookSchema = {
    body: joi.object({
        userId: generalRules.id,
        bookId: generalRules.id,
        availableCopies: joi.number().min(1).required()
    }).required(),

    headers: generalRules.headers.required()
};

//========== Return Book Schema ==========
export const returnBookSchema = {
    body: joi.object({
        userId: generalRules.id,
        bookId: generalRules.id,
        availableCopies: joi.number().min(0).required() // allow 0 after return
    }).required(),

    headers: generalRules.headers.required()
};
