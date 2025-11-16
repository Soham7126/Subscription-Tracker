import express from "express"
import cookieParser from "cookie-parser"
import { PORT } from "./config/env.js"
import userouter from "./routes/user.routes.js"
import authrouter from "./routes/auth.routes.js"
import subscriptionroter from "./routes/subscription.routes.js"
import connecttodb from "./db/mongodb.js"
import errormiddleware from "./middlewares/error.middleware.js"
import arcjet from "./middlewares/arcjet.middleware.js"
const app = express()

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(arcjet)
app.use("/api/v1/auth", authrouter)
app.use("/api/v1/users", userouter)
app.use("/api/v1/subscription", subscriptionroter)
app.use(errormiddleware)



app.get("/", (req, res) => {
    res.send("hellow world")
})

app.listen(PORT, async ()=> {
    console.log(`running on http://localhost:${PORT}`)

    await connecttodb()
})


export default app