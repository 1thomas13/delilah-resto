const { Sequelize, DataTypes, Model } = require('sequelize')
const { sequelize } = require('../database/sequelize')

class OrderDetails extends Model {}

OrderDetails.init({
 
  time: { type: Sequelize.STRING, allowNull: false },
  
  total: { type: Sequelize.INTEGER, allowNull: false }

}, { sequelize, modelName: 'OrderDetails' })


