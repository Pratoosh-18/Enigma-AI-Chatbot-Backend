import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const helloUser = (req, res) => {
    console.log("Hello user")

}

export { helloUser }