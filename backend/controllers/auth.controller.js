const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { z } = require('zod')

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

const signupUser = async (req, res) => {
    try {
        const validatedData = signupSchema.parse(req.body)

        const userExist = await User.findOne({ email: validatedData.email })
        if (userExist) {
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
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors })
        }
        res.status(500).json({ message: "Server Error in SignUp." })
    }
}


const loginUser = async(req, res) => {
    try{
        const validatedData = loginSchema.parse(req.body)

        const user = await User.findOne({email: validatedData.email})

        if(user && (await bcrypt.compare(validatedData.password, user.password))){
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            })
        }else{
            res.status(401).json({message: "Invalid email or password."})
        }
    }catch(error){
        if(error instanceof z.ZodError){
            return res.status(400).json({errors: error.errors})
        }
        res.status(500).json({ message: 'Server Error in User login.'})
    }
}

const getMe = async(req, res) => {
    res.status(200).json(req.user)
}

module.exports = { signupUser, loginUser, getMe}