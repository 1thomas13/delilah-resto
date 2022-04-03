const models = require("../../models")

exports.findOne = (name)=>{
    return models.User.findOne({where:{name:name}})
}