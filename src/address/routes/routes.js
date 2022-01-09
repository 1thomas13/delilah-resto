const express = require('express')
const router = express.Router()

router.use(express.json())

const { allAddress, addAddress, updateAddress, deleteAddress } = require('../controllers')

const { isAuthenticated, delete_modifyAddress } = require('../middlewares')

router.get('/', isAuthenticated, allAddress)
router.post('/', isAuthenticated, addAddress)
router.put('/:addressId', isAuthenticated, delete_modifyAddress, updateAddress)
router.delete('/:addressId', isAuthenticated, delete_modifyAddress, deleteAddress)

module.exports = router
