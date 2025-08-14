import userModel from "../DB/models/user.model.js";
import jwt from "jsonwebtoken"



export const authentication = async(req, res, next) =>
   {
    
      const { authorization } = req.headers;
      const [prefix, token] = authorization.split(" ") || []
      if (!prefix || !token) {
        throw new Error("token doesn't exist")
      }
    let signature =""
      if (prefix == "bearer")
        {
        signature = ACCESS_TOKEN_USER
        }
      else if (prefix == "admin"){
        signature = ACCESS_TOKEN_ADMIN
      }
      else {
        throw new Error("Invalid prefix token ") 
        
      }
        

    const decoded = jwt.verify(token,signature ); 

    const user = await userModel.findById(decoded.id).lean().select("name email role");

    if (!user) {
      throw new Error("User not found" );
    }
    req.user = user 
    return next()

    if (error.name =="JsonWebTokenError" | error.name ==" TokenExpiredError"){
        throw new Error("Invalid Token" );
      }
     
    
}