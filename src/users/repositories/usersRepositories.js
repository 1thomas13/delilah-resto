const models = require("../../models") 
const { Op } = require("sequelize");

exports.getAll = () => {
    return models.User.findAll()
}

exports.save = async(newUser) => {
    return await models.User.create(newUser)
}

exports.login = (user) =>{
    
    const findUser = models.User.findOne({
        where:{
            [Op.or]:[
                {
                    email:user.email,
                    password:user.password
                },
                {
                    username:user.username,
                    password:user.password
                }
            ]
        }
    }) 
    
    return findUser
}

exports.UpdateLogin = (user) => {
    return models.User.update({isLogged: true},{
        where:{
            [Op.or]:[
                {
                    email:user.email,
                    password:user.password
                },
                {
                    username:user.username,
                    password:user.password
                }
            ]
        }
    })
}

exports.suspendUser = (suspendedUserId) => {
    return models.User.update({isSuspended: true},{
        where:{
            id:suspendedUserId
        }
    })
}