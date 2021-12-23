const models = require("../models") 

const isLogged = (async (req,res,next) => {

    const findUser = await models.User.findOne({
        where:{id: req.params.id}
    })

    if(findUser == undefined){
        return res.status(400).json({message:"El usuario no existe"})
    } 

    if(findUser.isLogged == false){
        res.status(400).json({message:"Debes logearte primero"})   
        return
    }
    
    next()
    
})

const isAdmin = (async(req,res,next) => {

    const findUser = await models.User.findOne({
        where:{
            isAdmin: true,
            id:req.params.id
        }
    })

    if(findUser == undefined) {
        res.status(400).json({message:"Debes ser administrador para acceder"}) 
        return
    }
    
    next()
})

const emailValidate = (async(req,res,next) => {
     
    const findUser = await models.User.findOne({where:{email: req.body.email} })
    
    if(findUser == undefined) next()

    else return res.status(400).json({message:"Ya existe una cuenta con ese email. Intente con otro"})

})

const suspendValidate = async(req,res,next) => {
    const isSuspended = await models.User.findOne({
        where:{
            id:req.params.suspendedUserId,
            isSuspended:true
        }
    })

    if(isSuspended){
        return res.status(403).json({error:"El usuario ya esta suspendido"})
    }

    const isAdmin = await models.User.findOne({
        where:{
            id:req.params.suspendedUserId,
            isAdmin:true
        }
    })

        if(isAdmin){
            return res.status(403).json({error:"No puede suspender a un usuario administrador"}) 
        }

        next()
}

module.exports = {emailValidate,isLogged, isAdmin, suspendValidate}