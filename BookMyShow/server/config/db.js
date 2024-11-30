const mongoose = require('mongoose')

const dbURL = process.env.DB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
        // process.exit(1)
    }
}

module.exports = connectDB