const express = require('express')
const router = express.Router()
const { createProject, getAllProjects } = require('../controllers/project.controller')
const { protect } = require('../middleware/auth.middleware')

router.post('/', protect, createProject)
router.get('/', protect, getAllProjects)

module.exports = router