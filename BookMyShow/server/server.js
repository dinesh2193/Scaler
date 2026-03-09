const express = require("express")
const path = require("path")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const mongoSanitize = require("express-mongo-sanitize")
const cors = require("cors")

const app = express()
require('dotenv').config()

const connectDB = require('./config/db')
const userRouter = require("./routes/userRoutes")
const movieRouter = require("./routes/movieRoutes")
const theatreRouter = require("./routes/theatreRoutes")
const showRouter = require("./routes/showRoutes")
const bookingRouter = require("./routes/bookingRoutes")

connectDB()

// Security middleware
app.use(helmet())
app.disable("x-powered-by")

app.use(cors({
  origin: ["http://localhost:3000", process.env.CLIENT_URL].filter(Boolean),
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}))

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: "Too many requests, try again later" }
})
app.use("/api/", apiLimiter)

app.use(express.json({ extended: false }))
app.use(mongoSanitize())

// Routes
app.use("/api/users", userRouter)
app.use("/api/movies", movieRouter)
app.use("/api/theatres", theatreRouter)
app.use("/api/shows", showRouter)
app.use("/api/bookings", bookingRouter)

// Serve static files in production
const clientBuildPath = path.join(__dirname, "../client/build")
if (require("fs").existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath))
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"))
  })
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
