import express from "express"
import cors from "cors"
import {config} from "dotenv"
import dbConnect from "./config/mongoose.config.js"
import clothingItemRouter from "./routes/clothingItem.routes.js"
import userRouter from "./routes/user.routes.js"
import cookieParser from 'cookie-parser'

config()

const PORT = process.env.PORT
dbConnect()
const app = express()

app.use( cors( { origin: process.env.CORS_ORIGIN, credentials: true } ) )

app.use(express.json())
app.use(cookieParser())

app.use("/v1/closetOrganizer/clothingItem", clothingItemRouter)
app.use("/v1/closetOrganizer/user", userRouter)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
