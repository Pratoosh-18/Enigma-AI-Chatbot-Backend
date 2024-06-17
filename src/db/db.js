import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectdb = async () => { 
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/EnigmaV3`)
        console.log("You are connected to the Database")
    }catch{
        console.log("Database connection error")
    }
}

export default connectdb