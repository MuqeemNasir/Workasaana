const User = require('../models/User.model')
const logger = require('../utils/logger')

const getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find().select('-password')

        logger.info(`Fetched ${users.length} users`)
        res.status(200).json(users)
    }catch(error){
        next(error)
    }
}

module.exports = { getAllUsers }