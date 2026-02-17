const logger = require('../utils/logger')
const { z } = require('zod')

const errorHandler = (err, req, res, next) => {
    if (err instanceof z.ZodError) {
        logger.warn(`Validation Error on ${req.originalUrl}`)
        return res.status(400).json({
            message: "Validation Failed",
            errors: err.errors
        })
    }

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode

    logger.error(err.message, err.stack)

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = { errorHandler }