const express = require("express")
const router = express.Router()

const middle = require("../middlewares.js")

router.use(express.json())

const {allOrders, modifyStatusOrder, createOrder, confirmOrder, modifyOrder,getHistory} = require("../controllers")



router.get("/allOrders/:id",middle.isLogged,middle.isAdmin,allOrders)

router.put("/status/:id/:numOrder", middle.isLogged, middle.isAdmin, middle.statusValidate, modifyStatusOrder)

router.post("/:id", middle.isLogged, middle.validateOrder, createOrder)

router.get("/confirm/:id/:numOrder",middle.isLogged,middle.confirmOrder, confirmOrder)

router.put("/:id/:numOrder",middle.isLogged,middle.modifyOrder,middle.validateOrder, modifyOrder) 

router.get("/history/:id", middle.isLogged, getHistory)

module.exports = router