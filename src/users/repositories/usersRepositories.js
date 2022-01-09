const models = require('../../models')
const { Op } = require('sequelize')

exports.getAll = () => {
  return models.User.findAll()
}

exports.save = async (newUser) => {
  return await models.User.create(newUser)
}

exports.findOne = async (email) => {
  return await models.User.findOne({
    where: {
      email: email
    }
  })
}

exports.suspendUser = (suspendedUserId) => {
  return models.User.update({ isSuspended: true }, {
    where: {
      id: suspendedUserId
    }
  })
}
