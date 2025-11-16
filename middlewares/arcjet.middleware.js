import aj from "../config/arcjet.js"

const arcjet = async (req, res, next) => {
    try {
        const decision = await aj.protect(req ,{requested: 1})

        if(decision.isDenied()){
            if(decision.reason.isBot()) return res.status(403).json({ message: "Access denied: Bot detected" });
            if(decision.reason.isRateLimit()) return res.status(429).json({ message: "Access denied: Rate limit exceeded" });

            res.status(403).json({ message: "Access denied" });
        }

        next()
    } catch (error) {
        next(error)
    }
}

export default arcjet