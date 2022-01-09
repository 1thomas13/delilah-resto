const models = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

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

const loginValidate = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Debe ingresar el email y la contraseña para iniciar sesion' })
  }

  const findUser = await models.User.findOne({
    where: {
      email: email
    }
  })

  if (findUser == undefined) {
    return res.status(400).json({ message: 'Creedenciales incorrectas' })
  }

  if (findUser.isSuspended == true) {
    return res.status(400).json({ error: 'Lo sentimos pero tu cuenta se encuentra suspendida' })
  }

  const hashPass = await bcrypt.compare(password, findUser.password)

  if (hashPass == false) {
    return res.status(400).json({ message: 'Creedenciales incorrectas' })
  }

  return next()
}

const emailValidate = async (req, res, next) => {
  const findUser = await models.User.findOne({ where: { email: req.body.email } })

  if (findUser == undefined) next()

  else return res.status(400).json({ message: 'Ya existe una cuenta con ese email. Intente con otro' })
}

const suspendValidate = async (req, res, next) => {
  const userSuspended = await models.User.findOne({
    where: {
      id: req.params.suspendedUserId
    }
  })

  if (userSuspended.isSuspended) {
    return res.status(403).json({ error: 'El usuario ya esta suspendido' })
  }

  if (userSuspended.isAdmin == true) {
    return res.status(403).json({ error: 'No puede suspender a un usuario administrador' })
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

module.exports = { emailValidate, isAdmin, suspendValidate, loginValidate, isAuthenticated }
