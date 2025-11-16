const errormiddleware = (err, req, res, next) => {
    try {
       let error = { ...err} 
       error.message = err.message

       console.log(err)
        //resource finding 
       if(err.name === 'casterror'){
        const message = 'resource not found '
        error = new Error(message)
        error.statusCode = 404
       }

       //duplication key
       if(err.code === 11000){
        const message = 'duplicate field value entered'
        error = new Error(message)
        error.statusCode = 400
       }

       if(err.name === 'validatonerror'){
        const message = Object.values(err.errors).map(val => val.message)
        error = new Error(message.join(', '))
        error.statusCode = 400
       }

       res.status(error.statusCode || 500).json({
        success: false, 
        message: error.message || 'server error'
       })
    } catch (error) {
        next(error)
    }
}
export default errormiddleware