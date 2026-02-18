const express = require('express')
const router = express.Router()
const { createTag, getAllTags } = require('../controllers/tag.controller')
const { protect } = require('../middleware/auth.middleware')

router.post('/', protect, createTag)
router.get('/', protect, getAllTags)

module.exports = router