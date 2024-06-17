import mongoose,{Schema} from "mongoose";

const historySchema = new Schema({
    prompt:{
        type:String,
    },
    response:{
        type:String, 
    }
})

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    searchHistory:{
        type:[historySchema]
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema) 