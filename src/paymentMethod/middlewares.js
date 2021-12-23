const models = require("../models")

const isLogged = (async(req,res,next) => {
    findUser = await models.User.findOne({
        where: {
            id:req.params.id
        }
    })

    if(findUser == undefined) return res.status(400).json({message:"El usuario no existe"})

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
            isAdmin:true
        }
    })

    if(findUser == undefined) {
        res.status(403).json({message:"Debes ser administrador para acceder"}) 
        return
    }
    
    next()
})

const delete_modifyMethod = (async(req,res,next) => {

    const paymentMethod = await models.PaymentMethod.findOne ({
        where:{
            id:req.params.paymentMethodid
        }
    })

    if(paymentMethod == undefined){
        res.status(400).json({message:"El id ingresado no pertenece a un metodo de pago"})
        return
    }
    next()
})

module.exports = {isLogged,isAdmin,delete_modifyMethod}