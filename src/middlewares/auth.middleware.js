import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const verifyJWT = asyncHandler( async (req,_,next) => {
    try {
        const token = req.cookies?.accessToken
        console.log(token)
        // if(token===undefined){
        //     throw new ApiError(401, "Token not found")
        // }
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password")
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, "There is no active user")
    }
})
