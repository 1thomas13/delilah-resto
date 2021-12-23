const models = require("../models")

const isLogged = (async(req,res,next) => {
    // findUser = await models.User.findOne({
    //     where: {
    //         id:req.params.id
    //     }
    // })

    // if(findUser == undefined) return res.status(400).json({message:"El usuario no existe"})

    // if(findUser.isLogged == false){
    //     res.status(403).json({message:"Debes logearte primero"})   
    //     return
    // }
    
    next()
    
})

const delete_modifyAddress = (async(req,res,next) => {
    
    const Address = await models.Address.findOne({
        where:{
            id:req.params.addressId
        }
    })

    if(Address == undefined){
        res.status(400).json({message:"El id ingresado no pertenece a una direccion"})
        return
    }
    next()
})

module.exports={isLogged,delete_modifyAddress} 