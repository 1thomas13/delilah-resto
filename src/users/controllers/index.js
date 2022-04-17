const repositories = require('../repositories/usersRepositories')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../../config')
const models = require("../../models")

exports.allUsers = async (req, res) => {
  const users = await repositories.getAll()
  return res.status(200).json(users)
}

exports.getUser = async (req,res) =>{

  const emailUser = req.data.email

  const user = await repositories.findOne(emailUser)

  if(!user){
    return res.status(400).json({error:"No se encontro el usuario"})
  }

  return res.status(200).json(user)
}

exports.register = async (req, res) => {
  const { name, username, password, email, numberPhone } = req.body

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



exports.login = async (req, res,next) => {
  try {
    
    if(req.isAuthenticated){
      
      const {email,name} = req.user
      
      const password = Math.random().toString(32).slice(2)

      const hashPass = bcrypt.hashSync(password, 8)

      const [user,created] = await models.User.findOrCreate({where: { email: email, name:name, password:hashPass},})
      
      console.log(user)
      console.log(created)
  
      req.token = jwt.sign({ email: user.email, id: user.id }, config.config.jwt.secret, { expiresIn: 60 * 60 * 24 * 7 })

      return next()
    }
    
    const { email } = req.body
    const user = await repositories.findOne(email)
    
    
    const token = jwt.sign({ email: user.email, id: user.id }, config.config.jwt.secret, { expiresIn: 60 * 60 * 24 * 7 })
  
    return res.status(200).json({ Token: `${token}`, message: 'Sesion iniciada. Bienvenido!' })
    
  } catch (error) {
    console.log(error.message)
    return res.status(400).json(error.message)
  }
  
}

exports.suspendUser = async (req, res) => {
  const suspendedUserId = req.params.suspendedUserId

  const suspend = await repositories.suspendUser(suspendedUserId)

  if (suspend == 0) {
    return res.status(400).json({ message: 'El id del usuario a suspender no pertenece a un usuario' })
  }

  return res.status(200).json({ message: `Usuario con el id ${suspendedUserId} suspendido` })
}
