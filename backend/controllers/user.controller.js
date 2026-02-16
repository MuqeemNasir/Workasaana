const User = require('../models/User.model')
const logger = require('../utils/logger')

const createUser = async (req, res) => {
    try{
        const {name, email, password } = req.body

        const newUser = new User ({name, email, password})
        res.status(201).json({message: "New Agent created successfully."})
    }catch(error){
        logger.error("createAgent error: ", error)
        res.status(500).json({message: "Server error in creating user."})
    }
}