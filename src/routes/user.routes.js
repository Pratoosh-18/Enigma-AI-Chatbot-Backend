import { Router } from "express";
import { loginUser, registerUser, logoutUser, getCurrentUser, handlePrompt } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRoutes = Router()

userRoutes.route("/register").post(
    registerUser
)
userRoutes.route("/login").post(
    loginUser
)
userRoutes.route("/logout").post(
    verifyJWT, logoutUser
)
userRoutes.route("/currentUser").get(
    verifyJWT, getCurrentUser
)
userRoutes.route("/promptData").post(
    verifyJWT, handlePrompt
)

export default userRoutes