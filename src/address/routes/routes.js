const express = require("express")
const router = express.Router() 

router.use(express.json())

const {allAddress,addAddress,updateAddress,deleteAddress} = require("../controllers")

const {isLogged,delete_modifyAddress} = require("../middlewares")

router.get("/:userId",isLogged,allAddress)
router.post("/:userId",isLogged,addAddress)
router.put("/:userId/:addressId",isLogged, delete_modifyAddress, updateAddress)
router.delete("/:userId/:addressId",isLogged, delete_modifyAddress, deleteAddress)

module.exports = router