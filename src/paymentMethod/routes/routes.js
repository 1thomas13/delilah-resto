const express = require("express")
const router = express.Router()
const middle = require("../middlewares")

router.use(express.json())

const {allPaymentsMethod, createPaymentsMethod, modifyPaymentsMethod, deletePaymentMethod} = require("../controllers")

router.get("/:id",middle.isLogged, middle.isAdmin, allPaymentsMethod)

router.post("/create/:id",middle.isLogged, middle.isAdmin, createPaymentsMethod)

router.put("/:id/:paymentMethod",middle.isLogged, middle.isAdmin,middle.delete_modifyMethod, modifyPaymentsMethod)

router.delete("/delete/:id/:paymentMethod",middle.isLogged, middle.isAdmin, middle.delete_modifyMethod, deletePaymentMethod)

module.exports = router