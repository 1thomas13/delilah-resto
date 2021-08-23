const express = require("express")
const router = express.Router()
const products = require("../products/data.js")
const users = require("../users/data.js")

const data = require("./data.js")
const middle = require("./middlewares.js")

const orders = data.orders

router.use(express.json())

router.get("/:id",middle.isLogged,middle.isAdmin,(req, res) => {
    res.json({ orders: orders })
})

/*router.put("/:numOrder",(req, res) => {

    findOrder = orders.findIndex(orders => orders.numOrder == req.params.numOrder)

    if(findOrder == -1){
        res.status(400).json("No hay una orden con ese numero. Intente con otro")
    }
    else{
        orders[findOrder].status = req.body.status
        res.status(201).json(`Cambio de estado realizado con exito. El estado de la orden ${orders[findOrder].numOrder} es ${data.status[req.body.status]}`)
    }
   
})*/

let numOrder = 0
router.post("/:id", middle.isLogged, middle.validateOrder, (req, res) => {

    numOrder++

    const total = products[req.body.order.productId - 1].price * req.body.order.amount
    const date = new Date
    const time = `${date.getHours()}:${date.getMinutes()}`

    req.body.numOrder = numOrder
    req.body.time = time
    req.body.status = 0
    req.body.userId = req.params.id
    req.body.total = total


    orders.push(req.body)
    res.status(201).json({ message: "Pedido recibido!" })
})

router.get("/history/:id", middle.isLogged, (req, res) => {

    let history = orders.filter((orders) => orders.userId == req.params.id)

    if (history.length == 0) {
        res.status(400).json({ message: "No hiciste ningun pedido" })
    }

    res.status(200).json(history)
})

module.exports = router