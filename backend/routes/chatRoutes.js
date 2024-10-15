const express = require('express')
const { accessChat, fetchChats } = require('../controllers/chatController')
const { firebaseAuthMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(firebaseAuthMiddleware, accessChat)
router.route('/').get(firebaseAuthMiddleware, fetchChats)

module.exports = router