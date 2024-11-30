const express = require("express")

const app = express()
require('dotenv').config()

const connectDB = require('./config/db')
const userRouter = require("./routes/userRoutes")


connectDB()

/** Routes */
app.use(express.json({ extended: false })) // parse JSON bodies

app.use("/api/users", userRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})