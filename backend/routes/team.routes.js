const express = require('express')
const router = express.Router()
const {createTeam, getAllTeams, getTeamById, addMemberToTeam} = require('../controllers/team.controller')
const {protect} = require('../middleware/auth.middleware')

router.post('/', protect, createTeam)
router.get('/', protect, getAllTeams)
router.get('/:id', protect, getTeamById)
router.patch('/:id/members', protect, addMemberToTeam)

module.exports = router