
export const validation = (schema)=>{
    return(req,res,next) =>{
    let validationErrors = []
    for(key of Object.keys(schema)) {
        const result = schema[key].validate(req[key], {abortEarly: false})
        if(data?.error){
            validationErrors.push(data?.error?.details)
        }
    }

    if(validationErrors.length){
        throw new Error("validation error") 
   }

    return next()
}
}