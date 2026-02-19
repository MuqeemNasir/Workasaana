const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const logger = require('../utils/logger')


const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            if (!req.user) {
                logger.warn(`Auth Failed: Token valid but user not found (ID: ${decoded.id})`)
                return res.status(401).json({ message: "Not Authorized, user not found." })
            }

            next()
        } catch (error) {
            logger.error("Auth Failed: Token Verification Error", error.message)
            res.status(401).json({ message: 'Not authorized, token failed' })
        }
    }

    if (!token) {
        logger.warn("Auth Failed: No Token Provided")
        res.status(401).json({ message: 'Not Authorized, no token.' })
    }
}

module.exports = { protect }