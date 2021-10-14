const {Sequelize ,DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/sequelize');

class Address extends Model{}

Address.init({
    destination: {type: Sequelize.STRING,allowNull: false},
    user_id: {type: Sequelize.INTEGER,allowNull: false},

},{sequelize,modelName: "Address"})

module.exports = Address