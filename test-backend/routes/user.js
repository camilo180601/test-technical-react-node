const express = require('express')
const router = express.Router()
const Check = require('../middlewares/auth')
const UserController = require('../controllers/User')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/profile/:id', Check.auth, UserController.profile)

module.exports = router