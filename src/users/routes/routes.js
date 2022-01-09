const express = require('express')
const router = express.Router()
const middle = require('../middlewares')

router.use(express.json())

const { allUsers, register, login, suspendUser } = require('../controllers')

router.get('/all', middle.isAuthenticated, middle.isAdmin, allUsers)

router.post('/', middle.emailValidate, register)

router.post('/login', middle.loginValidate, login)

router.put('/suspendUser/:suspendedUserId', middle.isAuthenticated, middle.isAdmin, middle.suspendValidate, suspendUser)

module.exports = router
