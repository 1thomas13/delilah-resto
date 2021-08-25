const express = require("express")
const router = express.Router()
const middle = require("./middlewares")
const products = require("./data")

router.use(express.json())

router.get("/menu/:id",middle.isLogged,middle.isAdmin,(req,res) => {
    res.json({"products":products})
})

let id = 3
// router.post("/menu/:id",middle.isLogged,middle.isAdmin,(req,res) => {

//     req.body.id = id++
//     products.push(req.body)

//     res.status(201).json({message:"Producto agregado!"})
// })

// router.delete("/menu/:id/:productid",middle.isLogged,middle.isAdmin,middle.deleteProduct,(req,res) => {

//     products.splice(removed,1)
//     res.status(200).json({message:"Producto eliminado!"})
// })

module.exports = router