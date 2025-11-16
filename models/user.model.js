import mongoose, { mongo } from "mongoose";

const userschema = new mongoose.Schema({
    name: {
    type: String, 
    required: [true, 'username required'],
    trim: true, 
    minLength: 2, 
    maxLength: 50
    }, 
    email: {
    type: String, 
    required: [true, 'email required'],
    unique: true,
    tolowercase: true,
    trim: true, 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
    type: String, 
    required: [true, 'user password required'],
    minLength: 6, 
    maxLength: 100
    }
}, {timestamps: true})  

const user = mongoose.model('User', userschema)

export default user

