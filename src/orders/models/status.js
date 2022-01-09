const { Sequelize, DataTypes, Model } = require('sequelize')
const { sequelize } = require('../database/sequelize')

class OrderStatus extends Model {}

OrderStatus.init({
  status: { type: Sequelize.STRING, allowNull: false }

}, { sequelize, modelName: 'OrderStatus' })

module.exports = OrderStatus
