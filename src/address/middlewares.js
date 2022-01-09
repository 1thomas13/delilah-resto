const models = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config')

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, config.config.jwt.secret, (err, data) => {
      if (err) {
        return res.status(400).json(err)
      } else {
        req.data = data
        next()
      }
    })
  } catch (error) {
    return res.status(400).json({ err: 'Token invalido' })
  }
}

const delete_modifyAddress = async (req, res, next) => {
  const Address = await models.Address.findOne({
    where: {
      id: req.params.addressId
    }
  })

  if (Address == undefined) {
    res.status(400).json({ message: 'El id ingresado no pertenece a una direccion' })
    return
  }
  next()
}

module.exports = { isAuthenticated, delete_modifyAddress }
