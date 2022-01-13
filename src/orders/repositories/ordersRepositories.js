const res = require('express/lib/response')
const models = require('../../models')
const repositoriesProduct = require("../../products/repositories/productsRepositories")

exports.getAllOrders = () => {
    return models.Order.findAll({ include: models.OrderDetail })
}

exports.createOrder = (order) => {

    return models.Order.create(order)
}

exports.history = (userId) => {

    return models.Order.findAll({ include: models.OrderDetail,
        where:{userId:userId} 
    })
}

exports.createOrdersDetails = (order,id) =>{
    return order.forEach((o) => {

        let orderDetail = {
            amount: o.amount,
            productId: o.productId,
            orderId:id,
        }
        models.OrderDetail.create(orderDetail)
    })
     
}

exports.updateOrderDetails = (order,id) => {
    return order.forEach((o) => {
        models.OrderDetail.update({amount:o.amount,productId:o.productId},{
            where:{orderId:id}
        })
    })
}

exports.updateOrder = (order,idOrder) => {
    return models.Order.update({paymentMethodId:order.paymentMethodId,addressId:order.addressId,total:order.total,time:order.time},{
        where:{
            id:idOrder,
            userId:order.userId
        }
    })
}

exports.confirmOrder = (idOrder,userId) => {
    return models.Order.update({statusId:2},{
        where:{
            id:idOrder,
            userId:userId
        }
    })
}

exports.modifyStatus = (idOrder,statusId) => {
    return models.Order.update({statusId:statusId},{
        where:{
            id:idOrder,
        }
    })
}

exports.confirmStatus = (idOrder,userId,statusId) => {
    return models.Order.update({statusId:statusId},{
        where:{
            id:idOrder,
            userId:userId
        }
    })
}

exports.calculateTotal = async(order) => {
    try {
        let total = 0

        for await (let o of order){
            let product =  await repositoriesProduct.getOne(o.productId)
            
            total = total + product.price * o.amount
        }

        return total

    } catch (error) {
        res.status(400).json({error:error})
    }
    
}
