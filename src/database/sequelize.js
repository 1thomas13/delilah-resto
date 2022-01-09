const Sequelize = require('sequelize')
const { config } = require('../config')

const { host, port, user, password, database } = config.DB

const path = `mariadb://${user}:${password}@${host}:${port}/${database}`

exports.sequelize = new Sequelize(path)
