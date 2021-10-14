const {Sequelize ,DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/sequelize');

class OrderDetails extends Model{}

OrderDetails.init({
    user_id: {type: Sequelize.INTEGER,allowNull: false},
    time: {type: Sequelize.STRING,allowNull: false},
    status_id: {type: Sequelize.INTEGER,allowNull: false},
    address_id: {type: Sequelize.INTEGER,allowNull: false},
    paymentMethod_id: {type: Sequelize.INTEGER,allowNull: false},
    total: {type: Sequelize.INTEGER,allowNull: false},

},{sequelize,modelName: "OrderDetails"})

module.exports = OrderDetails