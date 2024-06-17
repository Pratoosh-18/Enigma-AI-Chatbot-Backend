import cors from "cors"
import express from "express" 

const app = express()
app.use(cors())

import userRoutes from "./src/routes/user.routes.js"
app.use("/api/v3/user",userRoutes)

export default app