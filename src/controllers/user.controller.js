import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
    const updatedUser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ updatedUser })
}

const logoutUser = async (req, res) => {
    const filter = { _id: req.user?._id }

    await User.updateOne(
        filter,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const updatedUser = await User.findById(req.user?._id)
    return res.status(200)
        .json({ updatedUser })
}

const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user?._id)
    // console.log(user)

    res.status(200)
        .json({ user })
}

const handlePrompt = async (req, res) => {
    const { prompt, response } = req.body
    const searchTime = new Date().toLocaleTimeString();

    const filter = { _id: req.user?._id };

    const result = await User.updateOne(filter,
        {
            $push: {
                searchHistory: [
                    { prompt, response, searchTime }
                ]
            },
        },
        {
            new: true
        }
    );
    const updatedUser = await User.findById(req.user?._id)
    res.status(200)
        .json({ updatedUser })
}

export { registerUser, loginUser, logoutUser, getCurrentUser, handlePrompt }