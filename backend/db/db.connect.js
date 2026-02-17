const mongoose = require('mongoose')
const logger = require('../utils/logger')

const initializeDatabase = async () => {
    const mongoURI = process.env.MONGODB_URI
    
    if (!mongoURI) {
        logger.error('Error: MONGODB_URI is not defined in .env')
        process.exit(1)
    }
    try {
        await mongoose.connect(mongoURI)
        logger.success("Connected Successfully")
    } catch (error) {
        logger.error("Failed to Connect.")
        process.exit(1)
    }
}

module.exports = initializeDatabase