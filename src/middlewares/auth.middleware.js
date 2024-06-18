import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"

export const verifyJWT = async (req,res,next) => {
    try {
        const token = req.cookies?.accessToken
        if(!token){
            throw new ApiError(401, "Token not found")
        }
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password")
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, "JWT verification error")
    }
}
