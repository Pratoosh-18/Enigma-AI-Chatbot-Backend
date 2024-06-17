import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = async (req, res) => {

    const { username, email, password } = req.body

    if(!username || !email || !password){
        throw new ApiError(401,"All the fields are required")
    }

    const user = await User.create({
        username,email,password
    })

    const createdUser = await User.findById(user._id)

    return res.status(200).json({ createdUser })
}

export { registerUser }