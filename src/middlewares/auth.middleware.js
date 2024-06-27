// import jwt from "jsonwebtoken"
// import { User } from "../models/user.model.js"
// import { ApiError } from "../utils/ApiError.js"
// import { asyncHandler } from "../utils/asyncHandler.js"

// export const verifyJWT = asyncHandler(async (req, _, next) => {
//     try {
//         // const token = req.cookies?.accessToken
//         const { accessToken } = req.body
//         console.log(accessToken)
//         // if(token===undefined){
//         //     throw new ApiError(401, "Token not found")
//         // }
//         try {
//             if (!process.env.ACCESS_TOKEN_SECRET) {
//                 throw new Error('ACCESS_TOKEN_SECRET is not defined');
//             }

//             const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
//             console.log("Decoded Token: ")
//             console.log(decodedToken); // Do something with the decoded token
//             console.log(decodedToken?._id); // Do something with the decoded token
//         } catch (error) {
//             console.error('Token verification failed:', error.message);
//             // Handle the error (e.g., send an error response to the client)
//         }


//         // const user = await User.findById(decodedToken?._id).select("-password")

//         const user = {}

//         if (decodedToken) {
//             console.log("Finding user ......")
//             try {
//                 user = await User.findById(decodedToken._id).select("-password");
//                 console.log("User found : "); // Do something with the user object
//                 console.log(user); // Do something with the user object
//             } catch (error) {
//                 console.error('User retrieval failed:', error.message);
//                 // Handle the error (e.g., send an error response to the client)
//             }
//         } else {
//             console.error('Invalid token: Missing user ID');
//             // Handle the invalid token case (e.g., send an error response to the client)
//         }

//         req.user = user
//         next()
//     } catch (error) {
//         throw new ApiError(401, "There is no active user")
//     }
// })


import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const { accessToken } = req.body;
        if (!accessToken) {
            throw new ApiError(401, "Token not found");
        }

        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error('ACCESS_TOKEN_SECRET is not defined');
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            console.log("Decoded Token:", decodedToken);
        } catch (error) {
            console.error('Token verification failed:', error.message);
            throw new ApiError(401, "Invalid token");
        }

        let user;
        try {
            user = await User.findById(decodedToken._id).select("-password");
            if (!user) {
                throw new ApiError(404, "User not found");
            }
            console.log("User found:", user);
        } catch (error) {
            console.error('User retrieval failed:', error.message);
            throw new ApiError(500, "Internal server error");
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
});
