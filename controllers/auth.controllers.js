import mongoose from "mongoose"
import user from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_EXPIRESIN, JWT_SECRET } from "../config/env.js"


export const signup = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const {name , email, password} = req.body
        const existinguser = await user.findOne({ email }).session(session)
        if(existinguser){
            const error = new Error("User already exists")
            error.statusCode = 409
            throw error
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newuser = (await user.create([{name, email, password: hashedPassword}], {session}))[0]

        const token = jwt.sign({ userId: newuser._id }, JWT_SECRET, {expiresIn: JWT_EXPIRESIN})
        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true, 
            message: "User created successfully",
            data:{
                token, 
                user: newuser
            }
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const signin = async (req,res,next)=> {
    try {
        const {email, password} = req.body
        const foundUser = await user.findOne({ email })

        if(!foundUser) {
            const error = new Error("user not found")
            error.statusCode = 404
            throw error
        }

        const ispasswordvalid= await bcrypt.compare(password, foundUser.password)

        if(!ispasswordvalid) {
            const error = new Error("invald password")
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign({ userId: foundUser._id }, JWT_SECRET, {expiresIn: JWT_EXPIRESIN})

        res.status(200).json({
            success: true, 
            message: 'user has signed successfully',
            data: {
                token,
                user: foundUser
            }
        })


    } catch (error) {
        next(error)
    }
}

export const signout = async(req, res, next) => {
    try {
        res.clearCookie("token")
        
        res.status(200).json({
            success: true,
            message: "User signed out successfully",
            data: {}
        })
    } catch (error) {
        next(error)
    }
}