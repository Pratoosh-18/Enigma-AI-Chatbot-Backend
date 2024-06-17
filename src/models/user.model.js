import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"

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

userSchema.pre("save",async function (next) {

    if(!this.isModified("password")) return next();
    
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User",userSchema) 