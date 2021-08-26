const express = require("express")
const users = require("../users/data.js")
const paymentMethod = require("./data.js")

const isLogged = ((req,res,next) => {
    findUser = users.find(users => users.id == req.params.id)

    if(findUser == undefined) return res.status(400).json({message:"El usuario no existe"})

    if(findUser.isLogged == false){
        res.status(400).json({message:"Debes logearte primero"})   
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

const delete_modifyMethod = ((req,res,next) => {

    index = paymentMethod.findIndex (paymentMethod => paymentMethod.id == req.params.paymentMethod)

    if(index == -1){
        res.status(400).json({message:"El id ingresado no pertenece a un metodo de pago"})
        return
    }
    next()
})

module.exports = {isLogged,isAdmin,delete_modifyMethod}