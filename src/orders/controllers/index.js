const repositories = require('../repositories/ordersRepositories')


exports.allOrders = async (req, res) => {
  const orders = await repositories.getAllOrders()

  res.status(200).json({ orders: orders })
}

// exports.modifyStatusOrder = (req, res) => {

//     findOrder = orders.findIndex(orders => orders.numOrder == req.params.numOrder)

//     if(findOrder == -1){
//         res.status(404).json({message:"No hay una orden con ese numero. Intente con otro"})
//     }
//     else{
//         orders[findOrder].status = req.body.status
//         res.status(201).json({message:`Cambio de estado realizado con exito. El estado de la orden ${req.params.numOrder} es ${data.status[req.body.status]}`})
//     }

// }

// let numOrder = 1

exports.createOrder = async (req, res) => {

  const date = new Date()
  const time = `${date.getHours()}:${date.getMinutes()}`

  const { order, paymentMethodId, addressId } = req.body

  if (!order || !paymentMethodId || !addressId) {
    res.status(403).json({ message: 'Faltan ingresar datos para hacer un pedido' })
  }
 

  const pro = await repositories.calculateTotal(order)

  const newOrder ={
    time: time,
    id:req.data.id,
    status: 1,
    paymentMethodId:paymentMethodId,
    address:addressId,
  }

//   newOrder = await this.createOrder(newOrder)
//     order.forEach((o) => {

//         let orderDetail = {
//             amount: o.amount,
//             productId: o.productId,
//         }

//         console.log(orderDetail)
//   })

  res.status(201).json({ message:pro })
  
}

// exports.confirmOrder = (req, res) => {

//     orders[findOrder].status = 1
//     res.status(201).json({message:`Se confirmo el pedido`})

// }

// exports.modifyOrder = (req, res) => {

//     const {order,paymentMethodId,destinationAddress} = req.body

//     orders[findOrder].order = order
//     orders[findOrder].paymentMethodId = paymentMethodId
//     orders[findOrder].destinationAddress = destinationAddress

//     res.status(201).json({message:`Pedido modificado`})
// }

// exports.getHistory = (req, res) => {

//     let history = orders.filter((orders) => orders.userId == req.params.id)

//     if (history.length == 0) {
//         res.status(400).json({ message: "No hiciste ningun pedido" })
//         return
//     }

//     res.status(200).json(history)
// }
