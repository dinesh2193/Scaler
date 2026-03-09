const express = require("express")

const app = express()
require('dotenv').config()

const connectDB = require('./config/db')
const userRouter = require("./routes/userRoutes")
const movieRouter = require("./routes/movieRoutes")
const theatreRouter = require("./routes/theatreRoutes")
const showRouter = require("./routes/showRoutes")
const bookingRouter = require("./routes/bookingRoutes")

connectDB()

/** Routes */
app.use(express.json({ extended: false })) // parse JSON bodies

app.use("/api/users", userRouter)
app.use("/api/movies", movieRouter)
app.use("/api/theatres", theatreRouter)
app.use("/api/shows", showRouter)
app.use("/api/bookings", bookingRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})