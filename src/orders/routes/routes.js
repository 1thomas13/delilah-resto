const express = require('express')
const router = express.Router()

const middle = require("../middlewares.js")

router.use(express.json())

const { allOrders,createOrder, getHistory, confirmOrder, modifyStatusOrder, modifyOrder } = require('../controllers')

router.get('/allOrders', middle.isAuthenticated,middle.isAdmin, allOrders)

router.patch("/:idOrder", middle.isAuthenticated, middle.isAdmin, modifyStatusOrder)

router.post("/", middle.isAuthenticated,createOrder)

router.patch("/confirm/:idOrder", middle.isAuthenticated, confirmOrder)

router.put("/:idOrder", middle.isAuthenticated, modifyOrder)

router.get("/history", middle.isAuthenticated, getHistory)

module.exports = router
