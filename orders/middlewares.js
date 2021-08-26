const express = require("express")
const users = require("../users/data.js")
const products = require("../products/data.js")
const orders = require("./data")
const paymentMethod = require("../paymentMethod/data")


const isLogged = ((req,res,next) => {
    findUser = users.find(users => users.id == req.params.id)

    if(findUser == undefined) return res.status(400).json({message:"El usuario no existe"})

    if(findUser.isLogged == false){
        res.status(400).json({message:"Debes logearte primero"})   
        return
    }
    
    next()
    
})

const validateOrder = ((req,res,next) => {

    if(req.body.order.amount < 1){
        res.status(400).json({message:"La cantidad del producto seleccionado debe ser superior a 0"})
        return
    }

    if(products[req.body.order.productId-1] == undefined || products[req.body.order.productId-1].available == false){
        res.status(400).json({message:"Lo sentimos, el producto no se encuentra disponible"})
        return
    }
    
    payment = paymentMethod.find( paymentMethod => req.body.paymentMethodId == paymentMethod.id)

    if(payment == undefined){
        res.status(400).json({message:"El metodo de pago no existe"})
        return
    }

    next()
})

const isAdmin = ((req,res,next) => {
    admin = users.find(users => users.id == req.params.id && users.isAdmin == true)

    if(admin == undefined) {
        res.status(400).json({message:"Debes ser administrador para acceder"}) 
        return
    }
    
    next()
})

const statusValidate = ((req,res,next) => {
    if(orders.status[req.body.status] == undefined){
        res.status(400).json({message:"El numero ingresado no pertenece a un estado de pedido"})
        return
    } 

    next()
})

module.exports = {isLogged,validateOrder,isAdmin,statusValidate}