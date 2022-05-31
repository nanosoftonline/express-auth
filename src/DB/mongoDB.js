const mongoose = require('mongoose')
const { cyan } = require("colors")

const connectToMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.italic)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = {
    connectToMongoDB
}