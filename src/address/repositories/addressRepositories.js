
const models = require('../../models')

exports.getAll = (userId) => {
  return models.Address.findAll({
    where: {
      userId: userId
    }
  })
}

exports.save = (address) => {
  return models.Address.create(address)
}

exports.update = (address) => {
  return models.Address.update({ destination: address.destination }, {
    where: {
      userId: address.userId,
      id: address.id
    }
  })
}

exports.destroy = (address) => {
  return models.Address.destroy({
    where: {
      userId: address.userId,
      id: address.id
    }
  })
}
