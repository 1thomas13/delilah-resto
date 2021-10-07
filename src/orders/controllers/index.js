const products = require("../../products/data")
const paymentMethod = require("../../paymentMethod/data")
const middle = require("../middlewares.js")
const data = require("../data.js")

const orders = data.orders

exports.allOrders = (req, res) => {
    res.json({orders: orders })
}

exports.modifyStatusOrder = (req, res) => {

    findOrder = orders.findIndex(orders => orders.numOrder == req.params.numOrder)

    if(findOrder == -1){
        res.status(404).json({message:"No hay una orden con ese numero. Intente con otro"})
    }
    else{
        orders[findOrder].status = req.body.status
        res.status(201).json({message:`Cambio de estado realizado con exito. El estado de la orden ${req.params.numOrder} es ${data.status[req.body.status]}`})
    }
   
}

let numOrder = 1

exports.createOrder = (req, res) => {

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
}

exports.confirmOrder = (req, res) => {

    orders[findOrder].status = 1
    res.status(201).json({message:`Se confirmo el pedido`})
    
}

exports.modifyOrder = (req, res) => {

    const {order,paymentMethodId,destinationAddress} = req.body
    
    orders[findOrder].order = order
    orders[findOrder].paymentMethodId = paymentMethodId
    orders[findOrder].destinationAddress = destinationAddress

    res.status(201).json({message:`Pedido modificado`})
}

exports.getHistory = (req, res) => {

    let history = orders.filter((orders) => orders.userId == req.params.id)

    if (history.length == 0) {
        res.status(400).json({ message: "No hiciste ningun pedido" })
        return
    }

    res.status(200).json(history)
}