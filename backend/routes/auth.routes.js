const express = require('express')
const router = express.Router()
const { signupUser, loginUser, getMe } = require('../controllers/auth.controller')
const {protect} = require('../middleware/auth.middleware')

router.post('/signup', signupUser)
router.post('/login', loginUser)

router.get('/me', protect, getMe)

module.exports = router