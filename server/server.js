import express from "express"
import cors from "cors"
import {config} from "dotenv"
import dbConnect from "./config/mongoose.config.js"
import clothingItemRouter from "./routes/clothingItem.routes.js"

const app = express()
app.use(express.json(), cors())
config()
const PORT = process.env.PORT
dbConnect()

app.use("/v1/closet_organizer", clothingItemRouter)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
