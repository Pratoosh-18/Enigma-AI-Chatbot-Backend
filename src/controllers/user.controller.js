import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async (userId) => {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
}

const registerUser = async (req, res) => {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        throw new ApiError(401, "All the fields are required")
    }

    const user = await User.create({
        username, email, password
    })

    const createdUser = await User.findById(user._id)

    return res.status(200).json({ createdUser })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(401, "Invalid email")
    }

    const isPassTrue = await user.isPasswordCorrect(password)
    if (!isPassTrue) {
        throw new ApiError(401, "Invalid password")
    }

    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user._id)
    const updatedUser = await User.findById(user._id).select("-password")
    
    return res.status(200).json({ updatedUser })
}

const logoutUser = async (req,res) => {
    console.log(req.user)
}

export { registerUser, loginUser, logoutUser }