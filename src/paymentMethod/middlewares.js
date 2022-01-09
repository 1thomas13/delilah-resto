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

const isAdmin = async (req, res, next) => {
  const findUser = await models.User.findOne({
    where: {
      isAdmin: true,
      id: req.data.id
    }
  })

  if (findUser == undefined) {
    res.status(403).json({ message: 'Debes ser administrador para acceder' })
    return
  }

  next()
}

const delete_modifyMethod = async (req, res, next) => {
  const paymentMethod = await models.PaymentMethod.findOne({
    where: {
      id: req.params.paymentMethodid
    }
  })

  if (paymentMethod == undefined) {
    res.status(400).json({ message: 'El id ingresado no pertenece a un metodo de pago' })
    return
  }
  next()
}

module.exports = { isAdmin, delete_modifyMethod, isAuthenticated }
