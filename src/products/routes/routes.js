const express = require("express")
const router = express.Router()
const middle = require("../middlewares")
const products = require("../data")

const {allProducts,createProduct, modifyProduct,deleteProduct} = require("../controllers")

router.use(express.json())

router.get("/:id", middle.isLogged, middle.isAdmin, allProducts)

router.post("/add/:id", middle.isLogged, middle.isAdmin, createProduct)

router.put("/:id/:productid", middle.isLogged, middle.isAdmin,middle.delete_modifyProduct, modifyProduct)

router.delete("/delete/:id/:productid", middle.isLogged, middle.isAdmin, middle.delete_modifyProduct, deleteProduct)

module.exports = router