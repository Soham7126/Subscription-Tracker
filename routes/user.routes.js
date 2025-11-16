import { Router } from "express";
import { getsingleuser, getusers } from "../controllers/user.controllers.js";
import authorize from "../middlewares/auth.middleware.js";

const userouter = Router()

userouter.get("/", getusers)

userouter.get("/:id", getsingleuser)

userouter.post("/", getusers)

userouter.put("/:id", getsingleuser)

userouter.delete("/:id", getsingleuser)

export default userouter