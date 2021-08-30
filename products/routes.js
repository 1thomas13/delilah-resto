const express = require("express")
const router = express.Router()
const middle = require("./middlewares")
const products = require("./data")

router.use(express.json())

router.get("/:id", middle.isLogged, middle.isAdmin, (req, res) => {
    res.json({ "products": products })
})

let id = 3
router.post("/:id", middle.isLogged, middle.isAdmin, (req, res) => {

    const {name,price,available} = req.body

    const newProduct = {
        id: id++,
        name: name,
        price: price,
        available: available 
    }

    products.push(newProduct)

    res.status(201).json({ message: "Producto agregado!" })
})

router.put("/:id/:productid", middle.isLogged, middle.isAdmin,middle.delete_modifyProduct,(req, res) => {

    const {name,price,available} = req.body

    products[product].name = name
    products[product].price = price
    products[product].available = available


    res.status(200).json({ message: "Producto modificado!" })
})

router.delete("/:id/:productid", middle.isLogged, middle.isAdmin, middle.delete_modifyProduct, (req, res) => {

    products.splice(product, 1)
    res.status(200).json({ message: "Producto eliminado!" })
})

module.exports = router