const express = require("express")
const users = require("./data.js")

const emailValidate = (req,res,next) => {
     
    find = users.find(users => users.email == req.body.email)

    if(find == undefined) next()

    else res.status(400).json({message:"Ya existe una cuenta con ese email. Intente con otro"})
    
}

const validateLogin = (req,res,next) => {

    findUser = users.find(users => users.nameuser == req.body.nameuser && users.password == req.body.password || users.email == req.body.email && users.password == req.body.password)
        
    if(findUser == undefined )  res.json("El usuario y la contraseña no coinciden")

    else next()
}
module.exports = {emailValidate, validateLogin}