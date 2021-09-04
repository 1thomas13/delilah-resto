const express = require("express")
const router = express.Router()
const middle = require("./middlewares")
const paymentMethod = require("./data")

router.use(express.json())

router.get("/:id",middle.isLogged,middle.isAdmin,(req,res) => {
    res.status(200).json(paymentMethod)
})

let id=3
router.post("/create/:id",middle.isLogged,middle.isAdmin,(req,res) => {

    const {method} = req.body

    const payment = {
        id:id++,
        method:method
    }

    paymentMethod.push(payment)
    res.status(201).json({message:"Metodo de pago creado"})
})

router.put("/:id/:paymentMethod",middle.isLogged,middle.isAdmin,middle.delete_modifyMethod,(req,res) => {

    const {id,method} = req.body

    const payment = {
        id:id,
        method:method
    }

    paymentMethod[index] = payment
    res.status(201).json({message:"Metodo de pago modificado"})
    
})

router.delete("/delete/:id/:paymentMethod",middle.isLogged,middle.isAdmin,middle.delete_modifyMethod,(req,res) => {

    paymentMethod.splice(index, 1)
    res.status(200).json({ message: "Metodo de pago eliminado!" })
})



module.exports = router