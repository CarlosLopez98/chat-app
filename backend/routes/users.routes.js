const express = require('express')
const { getUsersForChat } = require('../controllers/user.controller')
const protectRoute = require('../middleware/protectRoute')

const router = express.Router()

router.get('/', protectRoute, getUsersForChat)

module.exports = router