import user from "../models/user.model.js";

export const getusers = async (req, res, next) => {
    try {
        const users = await user.find()
        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        next(error)
    }
}

export const getsingleuser = async (req, res, next) => {
    try {
        const foundUser = await user.findById(req.params.id).select('-password')
        if(!foundUser){
            const error = new Error("user not found")
            error.statusCode = 404; 
            throw error
        }
        
        res.status(200).json({
            success: true,
            data: foundUser
        })
    } catch (error) {
        next(error)
    }
}