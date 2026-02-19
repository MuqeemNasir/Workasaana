const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { z } = require('zod')
const logger = require('../utils/logger')

const signupSchema = z.object({
    name: z.string().min(2, "Name must at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

const signupUser = async (req, res, next) => {
    try {
        const validatedData = signupSchema.parse(req.body)

        const userExist = await User.findOne({ email: validatedData.email })
        if (userExist) {
            logger.warn(`Signup failed: Email ${validatedData.email}`)
            return res.status(400).json({ message: 'User already exists.' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(validatedData.password, salt)

        const user = await User.create({
            name: validatedData.name,
            email: validatedData.email,
            password: hashedPassword,
        })

        if (user) {
            logger.success(`New User Signed Up: ${user.email}`)

            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            })
        } else {
            res.status(400).json({ message: "Invalid user data." })
        }
    } catch (error) {
        next(error)
    }
}


const loginUser = async (req, res, next) => {
    try {
        const validatedData = loginSchema.parse(req.body)

        const user = await User.findOne({ email: validatedData.email })

        if (user && (await bcrypt.compare(validatedData.password, user.password))) {
            logger.info(`User Logged In: ${user.email}`)

            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            })
        } else {
            logger.warn(`Login Failed: Invalid credentials for ${validatedData.email}`)
            res.status(401).json({ message: "Invalid email or password." })
        }
    } catch (error) {
        next(error)
    }
}

const getMe = async (req, res, next) => {
    try{
        res.status(200).json(req.user)
    }catch(error){
        next(error)
    }
}

module.exports = { signupUser, loginUser, getMe }