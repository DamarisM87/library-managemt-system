import joi from "joi"
import { generalRules } from "../../utils/generalRules.js";



export const addBookSchema = {
    body: joi.object({
        title: joi.string().min(5).required(),
        author: joi.string().length(5).required(),
        publishedYear: joi.number().max(2025).required(),
        availableCopies: joi.number().min(1).required(),
        

    }).required(),

    headers: generalRules.headers.required()
}

export const updateBookSchema = {
    body: joi.object({
        title: joi.string().min(5),
        author: joi.string().length(5),
        publishedYear: joi.number().max(2025),
        availableCopies: joi.number().min(1),
        

    }).required(),

    headers: generalRules.headers.required()
}