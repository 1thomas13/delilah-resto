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

module.exports = { isAuthenticated }