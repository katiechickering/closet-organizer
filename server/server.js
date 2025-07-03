import express from "express"
import cors from "cors"
import {config} from "dotenv"
import dbConnect from "./config/mongoose.config.js"
import clothingItemRouter from "./routes/clothingItem.routes.js"
import userRouter from "./routes/user.routes.js"
import cookieParser from 'cookie-parser'

dbConnect()
config({ path: ".env" });
if (process.env.NODE_ENV === "production") {
    config({ path: ".env.production" });
}

const PORT = process.env.PORT
const app = express()

app.use( cors( { origin: process.env.CORS_ORIGIN, credentials: true } ) )

app.use(express.json(), cors())
app.use( cookieParser() )

app.use("/v1/closetOrganizer/clothingItem", clothingItemRouter)
app.use("/v1/closetOrganizer/user", userRouter)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
