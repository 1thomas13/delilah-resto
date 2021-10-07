const express = require("express")
const users = require("./data.js")

const isLogged = ((req,res,next) => {
    findUser = users.find(users => users.id == req.params.id)

    if(findUser == undefined){
        return res.status(400).json({message:"El usuario no existe"})
    } 

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

const emailValidate = (req,res,next) => {
     
    find = users.find(users => users.email == req.body.email)

    if(find == undefined) next()

    else res.status(400).json({message:"Ya existe una cuenta con ese email. Intente con otro"})
    
}

const validateLogin = (req,res,next) => {

    findUser = users.find(users => users.username == req.body.username && users.password == req.body.password || users.email == req.body.email && users.password == req.body.password)
        
    if(findUser) next() 
    
    else{
        res.json("El usuario y la contraseña no coinciden")
        return
    }
}
module.exports = {emailValidate, validateLogin,isLogged,isAdmin}