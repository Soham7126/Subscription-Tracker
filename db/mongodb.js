import mongoose from "mongoose";
import { DB_URL, NODE_ENV } from "../config/env.js";

if(!DB_URL){
    throw new Error("please define the mongodb url")
}

const connecttodb = async () => {
    try {
        await mongoose.connect(DB_URL)
        console.log("database connected")
    } catch (error) {
        console.log("error connecting to your database", error)   
        process.exit(1)
    }
}

export default connecttodb