const express = require("express")

const router = express.Router()

router.use(express.json())

const products = require("../data/products.js")

router.get("/menu", (req,res) =>{
    res.json({"products":products})
})

module.exports = router