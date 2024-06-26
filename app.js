import cors from "cors"
import express from "express" 
import cookieParser from "cookie-parser"

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

import userRoutes from "./src/routes/user.routes.js"
app.use("/api/v3/user",userRoutes)

export default app