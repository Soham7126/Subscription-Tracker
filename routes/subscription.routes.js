import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {createSubscription, getuserworkflow, getallsubscription, getsubscrptionid, updatesubscription, deletesubscription, cancelsubscription, upcomingrenewals} from "../controllers/subscription.controllers.js"


const subscriptionroter = Router()

subscriptionroter.get("/upcoming-renewals", authorize, upcomingrenewals)

subscriptionroter.get("/user/:id", authorize, getuserworkflow)

subscriptionroter.get("/", authorize, getallsubscription)

subscriptionroter.get("/:id", authorize, getsubscrptionid)

subscriptionroter.post("/", authorize, createSubscription)

subscriptionroter.put("/:id", authorize, updatesubscription)

subscriptionroter.put("/:id/cancel", authorize, cancelsubscription)

subscriptionroter.delete("/:id", authorize, deletesubscription)

export default subscriptionroter