const express = require('express')
const router = express.Router()
const {registerUser,loginUser,otp} = require('./../controller/authController')
const {role} = require('../middleware/auth')

router.post('/register/:role',role, registerUser)
router.post('/login',loginUser)
router.get('/otp/:id/:code',otp)
// router.post('/updatephoto:id')
// router.get('/', getUserData)

module.exports = router
