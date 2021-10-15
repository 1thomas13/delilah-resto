const users = require("../users/data.js")
const products = require("../products/data.js")
const models = require("../models")

const isLogged = (async(req,res,next) => {
    findUser = await models.User.findOne({
        where:{
            id:req.params.id
        }
    })

    if(findUser == undefined){
        return res.status(400).json({message:"El usuario no existe"})
    } 

    if(findUser.isLogged == false){
        res.status(403).json({message:"Debes logearte primero"})   
        return
    }
    
    next()
    
})

const isAdmin = (async(req,res,next) => {
    findUser = await models.User.findOne({
        where:{
            id:req.params.id,
        }
    })

    if(findUser.isAdmin == false) {
        res.status(403).json({message:"Debes ser administrador para acceder"}) 
        return
    }
    
    next()
})

const delete_modifyProduct = async(req,res,next) => {
    
    const product = await models.Products.findOne({
        where:{
            id:req.params.productid
        }
    })

    if(product == undefined){
        res.status(400).json({message:"El id ingresado no pertenece a un producto"})
        return
    }
    next()
}

module.exports = {isLogged,isAdmin,delete_modifyProduct}