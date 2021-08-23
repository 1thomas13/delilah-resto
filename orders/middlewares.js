const express = require("express")
const users = require("../users/data.js")
const products = require("../products/data.js")
const orders = require("./data")

const isLogged = ((req,res,next) => {
    findUser = users.find(users => users.id == req.params.id)

    if(findUser == undefined) res.status(400).json({message:"El usuario no existe"})

    else{
        if(findUser.isLogged == true){
            next()
        }
        else res.status(400).json({message:"Debes logearte primero"})
    }    
})

const validateOrder = ((req,res,next) => {

    findProduct = products.find((products) => products.id == req.body.order.productId)

    if(findProduct == undefined){
        res.status(400).json({message:"El id ingresado no pertenece a un producto"})
    }

    else {
        if(req.body.order.amount < 1){
            res.status(400).json({message:"La cantidad del producto seleccionado debe ser superior a 0"})
        }
        else {
            if(products[req.body.order.productId].available == false){
                res.status(400).json({message:"Lo sentimos, el producto no se encuentra disponible"})
            }
            else {
                if(orders.paymentMethod[req.body.paymentMethod] == undefined){

                    res.status(400).json({message:"El metodo de pago no existe"})
                }
                next()
            }
        } 
    }
})

const isAdmin = ((req,res,next) => {
    admin = users.find(users => users.id == req.params.id && users.isAdmin == true)

    if(admin == undefined) res.status(400).json({message:"Debes ser administrador para acceder"})
    
    else next()
})

module.exports = {isLogged,validateOrder,isAdmin}