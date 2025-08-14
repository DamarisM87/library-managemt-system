import { Router } from "express";
import * as UB from "./book.service.js";


import * as BV from "./book.validation.js"
import { validation } from "../../middleware/validation.js";
import { authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { userRoles } from "../../DB/models/user.model.js";

export const bookRouter = Router();
bookRouter.post("/addbook",authentication, authorization(userRoles.admin),validation(BV.addBookSchema), UB.addBook);
bookRouter.get("/get-books", authentication, UB.getBooks)
bookRouter.put("/update-book/:bookId",authentication, authorization(userRoles.admin),validation(BV.updateBookSchema), UB.updateBook)
bookRouter.delete("/delete-book/:bookId",authentication, authorization(userRoles.admin), UB.deleteBook)