const express = require('express')
const router = express.Router()

const middle = require("../middlewares.js")

router.use(express.json())

const { allOrders,createOrder } = require('../controllers')

router.get('/allOrders', middle.isAuthenticated,middle.isAdmin, allOrders)

// router.put("/status/:id/:numOrder", middle.isLogged, middle.isAdmin, middle.statusValidate, modifyStatusOrder)

router.post("/", middle.isAuthenticated,createOrder)

// router.get("/confirm/:id/:numOrder",middle.isLogged,middle.confirmOrder, confirmOrder)

// router.put("/:id/:numOrder",middle.isLogged,middle.modifyOrder,middle.validateOrder, modifyOrder)

// router.get("/history/:id", middle.isLogged, getHistory)

module.exports = router
