const { Sequelize, DataTypes, Model } = require('sequelize')
const { sequelize } = require('../database/sequelize')

class Order extends Model {}

Order.init({
  amount: { type: Sequelize.INTEGER, allowNull: false },
  price: { type: Sequelize.INTEGER, allowNull: false }

}, { sequelize, modelName: 'Order' })

module.exports = Order
