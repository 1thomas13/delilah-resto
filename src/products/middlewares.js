const models = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config')

const redis = require('redis')
const bluebird = require('bluebird')
bluebird.promisifyAll(redis)



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

const delete_modifyProduct = async (req, res, next) => {
  const product = await models.Product.findOne({
    where: {
      id: req.params.productid
    }
  })

  if (product == undefined) {
    res.status(400).json({ message: 'El id ingresado no pertenece a un producto' })
    return
  }
  next()
}

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

module.exports = { isAdmin, delete_modifyProduct, isAuthenticated }
