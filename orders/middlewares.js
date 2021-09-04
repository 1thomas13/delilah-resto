const express = require("express")
const users = require("../users/data.js")
const products = require("../products/data.js")
const data = require("./data")
const orders = data.orders
const paymentMethod = require("../paymentMethod/data")


const isLogged = ((req,res,next) => {
    findUser = users.find(users => users.id == req.params.id)

    if(findUser == undefined) return res.status(400).json({message:"El usuario no existe"})

    if(findUser.isLogged == false){
        res.status(403).json({message:"Debes logearte primero"})   
        return
    }
    
    next()
    
})

const validateOrder = ((req,res,next) => {

    if(req.body.order.amount < 1){
        res.status(400).json({message:"La cantidad del producto seleccionado debe ser superior a 0"})
        return
    }1
 
    payment = paymentMethod.find( paymentMethod => req.body.paymentMethodId == paymentMethod.id)
 
    if(payment == undefined){
        res.status(400).json({message:"El metodo de pago no existe"})
        return
    }

    req.body.order.forEach((orders,i) => {

        productsIndex = products.findIndex(products => products.id == req.body.order[i].productId)

        if(!products[productsIndex] || products[productsIndex].available == false || productsIndex == -1 ) {
            res.status(400).json({message:"Lo sentimos, un producto seleccionado no se encuentra disponible"})
            return
        }  
    })

    next()
    
})

const isAdmin = ((req,res,next) => {
    admin = users.find(users => users.id == req.params.id && users.isAdmin == true)

    if(admin == undefined) {
        res.status(403).json({message:"Debes ser administrador para acceder"}) 
        return
    }
    
    next()
})

const statusValidate = ((req,res,next) => {
    if(data.status[req.body.status] == undefined){
        res.status(404).json({message:"El numero ingresado no pertenece a un estado de pedido"})
        return
    } 

    next()
})

const confirmOrder = ((req,res,next) => {

    findOrder = orders.findIndex(orders => orders.numOrder == req.params.numOrder && orders.userId == req.params.id)

    if(findOrder == -1){
        res.status(400).json({message:`No puede confirmar el pedido seleccionado`})
        return
    }

    if(orders[findOrder].status >= 1){
        res.status(400).json({message:`El pedido ya esta confirmado`})
        return
    }

    next()
})

const modifyOrder = ((req,res,next) => {

    findOrder = orders.findIndex(orders => orders.numOrder == req.params.numOrder && orders.userId == req.params.id)

    if(findOrder == -1){
        res.status(400).json({message:`No puede modificar el pedido seleccionado`})
        return
    }

    if(orders[findOrder].status != 0){
        res.status(400).json({message:`No puede modificar el pedido por que ya fue confirmado`})
        return
    }

    next()
})

const calculateTotal = (req) => {
    let total = 0
     req.body.order.forEach((orders,i) => {
 
         productsIndex = products.findIndex(products => products.id == req.body.order[i].productId)  
 
         total = total + products[productsIndex].price * req.body.order[i].amount
     })
 
     return total
 }

module.exports = {isLogged,validateOrder,isAdmin,statusValidate,confirmOrder,modifyOrder,calculateTotal}