import { Router } from "express";
import { helloUser } from "../controllers/user.controller.js";

const userRoutes = Router()

userRoutes.route("/hello").get(helloUser)

export default userRoutes