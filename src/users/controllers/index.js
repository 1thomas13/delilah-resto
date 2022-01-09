const repositories = require('../repositories/usersRepositories')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../../config')

exports.allUsers = async (req, res) => {
  const users = await repositories.getAll()
  return res.status(200).json(users)
}

exports.register = async (req, res) => {
  const { name, username, password, email, numberPhone } = req.body

  if (!name || !username || !password || !email || !numberPhone) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' })
  }

  const hashPass = bcrypt.hashSync(password, 8)

  const newUser = {
    name: name,
    username: username,
    password: hashPass,
    email: email,
    numberPhone: numberPhone
  }

  await repositories.save(newUser)

  return res.status(201).json({ message: 'Usuario creado correctamente' })
}

exports.login = async (req, res) => {
  const { email } = req.body

  const user = await repositories.findOne(email)

  const token = jwt.sign({ email: user.email, id: user.id }, config.config.jwt.secret, { expiresIn: 60 * 60 * 24 * 7 })

  return res.status(200).json({ Token: `${token}`, message: 'Sesion iniciada. Bienvenido!' })
}

exports.suspendUser = async (req, res) => {
  const suspendedUserId = req.params.suspendedUserId

  const suspend = await repositories.suspendUser(suspendedUserId)

  if (suspend == 0) {
    return res.status(400).json({ message: 'El id del usuario a suspender no pertenece a un usuario' })
  }

  return res.status(200).json({ message: `Usuario con el id ${suspendedUserId} suspendido` })
}
