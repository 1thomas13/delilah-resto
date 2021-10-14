const {Sequelize ,DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/sequelize');

class User extends Model{}

User.init({
    name: {type: Sequelize.STRING,allowNull: false},
    username: {type: Sequelize.STRING,allowNull: false},
    password: {type: Sequelize.STRING,allowNull: false},
    email: {type: Sequelize.STRING,allowNull: false},
    numberPhone: {type: Sequelize.INTEGER,allowNull: false},
    address_id: {type: Sequelize.INTEGER,allowNull: false},
    isAdmin: {type: Sequelize.BOOLEAN,allowNull: false},
    isLogged: {type: Sequelize.BOOLEAN,allowNull: false},

},{sequelize,modelName: "User"})

module.exports = User