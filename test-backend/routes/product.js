const express = require('express')
const router = express.Router()
const Check = require('../middlewares/auth')
const ProductController = require('../controllers/Product')

router.get('/feed', Check.auth, ProductController.feed)

module.exports = router