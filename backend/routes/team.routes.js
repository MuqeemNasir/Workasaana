const express = require('express')
const router = express.Router()
const {createTeam, getAllTeams} = require('../controllers/team.controller')
const {protect} = require('../middleware/auth.middleware')

router.post('/', protect, createTeam)
router.get('/', protect, getAllTeams)

module.exports = router