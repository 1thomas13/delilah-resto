const repositories = require('../repositories/ordersRepositories')


exports.allOrders = async (req, res) => {
  const orders = await repositories.getAllOrders()

  res.status(200).json({ orders: orders })
}

exports.getHistory = async (req, res) => {

    const history = await repositories.history(req.data.id)
  
    res.status(200).json({ orders: history })
}

exports.createOrder = async (req, res) => {

  const { order, paymentMethodId, addressId } = req.body

  const date = new Date()
  const time = `${date.getHours()}:${date.getMinutes()}`

  if (!order || !paymentMethodId || !addressId) {
    res.status(403).json({ message: 'Faltan ingresar datos para hacer un pedido' })
  }
 

  const total = await repositories.calculateTotal(order)

  const newOrder ={
    time: time,
    userId:req.data.id,
    statusId: 1,
    paymentMethodId:paymentMethodId,
    addressId:addressId,
    total:total
  }
 
    const orderCreated = await repositories.createOrder(newOrder)

    await repositories.createOrdersDetails(order,orderCreated.id)
 
  res.status(201).json({ message:"Orden creada!!" })
  
}

exports.modifyOrder = async (req,res) => {

    const orderId = req.params.idOrder

    const { order, paymentMethodId, addressId } = req.body

    const date = new Date()
     const time = `${date.getHours()}:${date.getMinutes()}`

    if (!order || !paymentMethodId || !addressId) {
        res.status(403).json({ message: 'Faltan ingresar datos para hacer un pedido' })
    }
     
    const total = await repositories.calculateTotal(order)
    
    const update ={
        time: time,
        userId:req.data.id,
        statusId: 1,
        paymentMethodId:paymentMethodId,
        addressId:addressId,
        total:total
    }

    const updateOrder = await repositories.createOrder(update,orderId)

    res.status(201).json({message:"Orden modificada correctamente", orden: updateOrder})
}


exports.confirmOrder = async(req, res) => {

    const orderId = req.params.idOrder

    const statusConfirmed = 2

    await  repositories.confirmOrder(orderId, req.data.id, statusConfirmed)

    res.status(201).json({message:`Se confirmo el pedido`})

}

exports.modifyStatusOrder = async(req, res) => {

    const {statusId} = req.body
    const orderId = req.params.idOrder

    if(!statusId || statusId>6 || statusId<1) {
        res.status(400).json({error:"Debe ingresar un statusId valido para modificar su estado"})
    }

    await  repositories.modifyStatus(orderId, statusId)


    res.status(201).json({message: "Estado del pedido modificado"})
    
}
