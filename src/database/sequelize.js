const Sequelize = require('sequelize')
const { config } = require('../config')

const path = config.DB.url

exports.sequelize = new Sequelize(path)
