const express = require('express')
const router = express.Router()

router.use(express.json())

const {addPayment,get} = require("../controllers")

router.post('/pay', addPayment)

router.get('/paya', get)

module.exports = router;
