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
        where:{isAdmin: true}
    })

    if(findUser == undefined) {
        res.status(400).json({message:"Debes ser administrador para acceder"}) 
        return
    }
    
    next()
})

const emailValidate = (async(req,res,next) => {
     
    try {
        const findUser = await models.User.findOne({where:{email: req.body.email} })
        
        if(findUser == undefined) next()

        else res.status(400).json({message:"Ya existe una cuenta con ese email. Intente con otro"})

    } catch (error) {
        res.status(400).json({message:"Todos los campos son obligatorios"})
    }
   

    
    
})

module.exports = {emailValidate,isLogged, isAdmin}