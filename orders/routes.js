const express = require("express")
const router = express.Router()
const products = require("../products/data.js")
const paymentMethod = require("../paymentMethod/data")

const data = require("./data.js")
const middle = require("./middlewares.js")

const orders = data.orders

router.use(express.json())

//mostrar pedidos
router.get("/:id",middle.isLogged,middle.isAdmin,(req, res) => {
    res.json({orders: orders })
})

//cambiar el estado
router.put("/status/:id/:numOrder",middle.isLogged,middle.isAdmin,middle.statusValidate,(req, res) => {

    findOrder = orders.findIndex(orders => orders.numOrder == req.params.numOrder)

    if(findOrder == -1){
        res.status(400).json({message:"No hay una orden con ese numero. Intente con otro"})
    }
    else{
        orders[findOrder].status = req.body.status
        res.status(201).json({message:`Cambio de estado realizado con exito. El estado de la orden ${req.params.numOrder} es ${data.status[req.body.status]}`})
    }
   
})

//hacer pedido
let numOrder = 0
router.post("/:id", middle.isLogged, middle.validateOrder, (req, res) => {

    const date = new Date
    const time = `${date.getHours()}:${date.getMinutes()}`

    total = middle.calculateTotal(req)

    const {order,paymentMethodId,destinationAddress} = req.body

    const newOrder={
        numOrder: numOrder++,
        userId: req.params.id,
        order: order,
        time: time,
        status: 0,
        destinationAddress: destinationAddress,
        paymentMethodId: paymentMethodId,
        total: total
    }

    selectedPayment = paymentMethod.find(paymentMethod => paymentMethod.id == paymentMethodId)

    orders.push(newOrder)
    res.status(201).json({ message: `El total es de ${total} y el pago seleccionado es ${selectedPayment.method}. Debe confirmar el pedido para continuar`})
})

//Confirmar pedido
    
router.get("/confirm/:id/:numOrder",middle.isLogged,middle.confirmOrder,(req, res) => {

    orders[findOrder].status = 1
    res.status(201).json({message:`Se confirmo el pedido`})
    
})

// modificar pedido
    
router.put("/:id/:numOrder",middle.isLogged,middle.modifyOrder,middle.validateOrder,(req, res) => {

    const {order,paymentMethodId,destinationAddress} = req.body
    
    orders[findOrder].order = order
    orders[findOrder].paymentMethodId = paymentMethodId
    orders[findOrder].destinationAddress = destinationAddress

    res.status(201).json({message:`Pedido modificado`})
    
})


// mostrar historial
router.get("/history/:id", middle.isLogged, (req, res) => {

    let history = orders.filter((orders) => orders.userId == req.params.id)

    if (history.length == 0) {
        res.status(400).json({ message: "No hiciste ningun pedido" })
        return
    }

    res.status(200).json(history)
})

module.exports = router