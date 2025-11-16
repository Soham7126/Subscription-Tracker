import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env.js"
import user from "../models/user.model.js"
const authorize = async (req, res, next) => {
    try {
        let token

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        }

        if(!token){
            return res.status(401).json({ message: "Authorization token missing" });
        }
        const decoded = jwt.verify(token, JWT_SECRET)
        const foundUser = await user.findById(decoded.userId)

        if(!foundUser) return res.status(404).json({ message: "User not found" });   

        req.user = foundUser;
        next();

    } catch (error) {
        res.status(500).json({ message: "Authorization failed", error: error.message });
    }
}

export default authorize