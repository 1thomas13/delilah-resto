const models = require('../../models')
const repositoriesProduct = require("../../products/repositories/productsRepositories")

exports.getAllOrders = () => {
    return models.Order.findAll()
}

exports.saveOrder = (order) => {

    return models.Order.create(order)
}

exports.createOrderDetails = (orderDetail) => {
    return models.OrderDetail.create(orderDetail)
}

exports.confirmOrder = (order) => {
  return models.Order.update({ order })
}

exports.calculateTotal = async(order) => {
    let total = 0

    for await (let o of order){
        let product =  await repositoriesProduct.getOne(o.productId)
        
        total = total + product.price * o.amount
    }
    
    return total
}
