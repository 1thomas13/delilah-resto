const {Sequelize ,DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/sequelize');


class PaymentMethod extends Model{}

PaymentMethod.init({
    method: {type: Sequelize.STRING,allowNull: false},

},{sequelize,modelName: "PaymentMethod"})

module.exports = PaymentMethod