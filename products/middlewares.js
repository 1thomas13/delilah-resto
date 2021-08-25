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

const isAdmin = ((req,res,next) => {
    admin = users.find(users => users.id == req.params.id && users.isAdmin == true)

    if(admin == undefined) res.status(400).json({message:"Debes ser administrador para acceder"})
    
    else next()
})

const deleteProduct = ((req,ers,next) => {

    removed = products.findIndex (products => products.id == req.params.productid)

    if(removed == undefined){
        res.status(400).json({message:"El id ingresado no pertenece a un producto"})
    }
    else next()
})
module.exports = {isLogged,isAdmin,deleteProduct}