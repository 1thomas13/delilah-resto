const express = require('express')
const router = express.Router()

router.use(express.json())

const {isAuthenticated} = require('../middlewares')

const {addPaymentMercadoPago,getMercadoPago} = require("../controllers/mercadoPago")


const {addPaymentPaypal,sucess,cancel} = require("../controllers/paypal")


router.post('/pay/mercadopago',isAuthenticated, addPaymentMercadoPago)

router.post('/pay/paypal',isAuthenticated, addPaymentPaypal)

router.get('/sucess',isAuthenticated, sucess)

router.get('/cancel',isAuthenticated, cancel)

router.get('/pay',isAuthenticated, getMercadoPago)

module.exports = router
