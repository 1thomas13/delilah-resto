const products = require("../data")
const { delete_modifyProduct } = require("../middlewares")

exports.allProducts = (req, res) => {
    res.status(201).json({ "products": products })
}

let id = 3
exports.createProduct = (req, res) => {

    const {name,price,available} = req.body

    const newProduct = {
        id: id++,
        name: name,
        price: price,
        available: available 
    }

    products.push(newProduct)

    res.status(201).json({ message: "Producto agregado!" })
}

exports.modifyProduct=(req, res) => {

    const {name,price,available} = req.body

    products[product].name = name
    products[product].price = price
    products[product].available = available


    res.status(200).json({ message: "Producto modificado!" })
}

exports.deleteProduct = (req, res) => {

    products.splice(product, 1)
    res.status(200).json({ message: "Producto eliminado!" })
}