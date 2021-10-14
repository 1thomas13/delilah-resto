const {Sequelize ,DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/sequelize');

class Products extends Model{}

Products.init({
    name: {type: Sequelize.STRING,allowNull: false},
    price: {type: Sequelize.INTEGER,allowNull: false},
    available: {type: Sequelize.BOOLEAN,allowNull: false},

},{sequelize,modelName: "Products"})

module.exports = Products