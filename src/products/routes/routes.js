const express = require('express')
const router = express.Router()
const middle = require('../middlewares')

const { allProducts, createProduct, modifyProduct, deleteProduct, getProduct } = require('../controllers')

router.use(express.json())

router.get('/', allProducts)

router.post('/add', middle.isAuthenticated, middle.isAdmin, createProduct)

router.put('/:productid', middle.isAuthenticated, middle.isAdmin, middle.delete_modifyProduct, modifyProduct)

router.delete('/delete/:productid', middle.isAuthenticated, middle.isAdmin, middle.delete_modifyProduct, deleteProduct)

module.exports = router
