const express = require('express')
const router = express.Router()

const middle = require("../middlewares.js")

router.use(express.json())

const { allOrders,createOrder, getHistory, confirmOrder, modifyStatusOrder, modifyOrder } = require('../controllers')

router.get('/allOrders', middle.isAuthenticated,middle.isAdmin, allOrders)

router.patch("/:idOrder", middle.isAuthenticated, middle.isAdmin, middle.validateOrder, modifyStatusOrder)

router.post("/", middle.isAuthenticated,middle.validateAddressStatus,createOrder)

router.patch("/confirm/:idOrder", middle.isAuthenticated,middle.validateOrder,middle.validateOrderId, confirmOrder)

router.put("/:idOrder", middle.isAuthenticated,middle.validateOrder,middle.validateAddressStatus,middle.validateModify, modifyOrder)

router.get("/history", middle.isAuthenticated, getHistory)

module.exports = router
