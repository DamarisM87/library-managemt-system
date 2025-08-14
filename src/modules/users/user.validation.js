import joi from "joi"
import { generalRules } from "../../utils/generalRules.js";
import { userRoles } from "../../DB/models/user.model.js";


export const signUpSchema = {
    body: joi.object({
        name: joi.string().length(5).required(),
        email: generalRules.email.required(),
        password: generalRules.password.required(),
        cPassword: joi.string().valid(joi.ref("password")).required(),
        role: joi.string().valid(userRoles.admin,userRoles.member).required()
        

    }).required(),

    headers: generalRules.headers.required()
}