const express = require('express')
const router = express.Router()
const middle = require('../middlewares')

router.use(express.json())

const { allPaymentsMethod, createPaymentsMethod, modifyPaymentsMethod, deletePaymentMethod } = require('../controllers')

router.get('/', middle.isAuthenticated, allPaymentsMethod)

router.post('/create', middle.isAuthenticated, middle.isAdmin, createPaymentsMethod)

router.put('/:paymentMethodid', middle.isAuthenticated, middle.isAdmin, middle.delete_modifyMethod, modifyPaymentsMethod)

router.delete('/delete/:paymentMethodid', middle.isAuthenticated, middle.isAdmin, middle.delete_modifyMethod, deletePaymentMethod)

module.exports = router
