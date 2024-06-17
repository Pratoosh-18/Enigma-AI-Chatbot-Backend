import app from "./app.js";
import connectdb from "./src/db/db.js";

connectdb()
.then(()=>{
    app.get("/",(req,res)=>{
        res.send("This is the home response")
    })
    
    app.listen(process.env.PORT || 3000,()=>{
        console.log("App is listening on port 8000")
    })
})
.catch((error)=>{
    console.log("Mongo DB connection failed")
    console.log(error)
})