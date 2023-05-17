import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js' //note: .js needs to be added here as type is module
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config() //pull enviromnet variables from .env file

const app = express()

//adding middleware
app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)


app.get('/', async (req,res) => {
    res.send("Hello")
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, () => {
            console.log("Server running on port 8080")
        })
    }
    catch (e) {
        console.log(err)
    }
}

startServer()