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
    isSuspended: {type: Sequelize.BOOLEAN,allowNull: false},

},{sequelize,modelName: "User"})


class Address extends Model{}

Address.init({
    destination: {type: Sequelize.STRING,allowNull: false},
    user_id: {type: Sequelize.INTEGER,allowNull: false},

},{sequelize,modelName: "Address"})

class Products extends Model{}

Products.init({
    name: {type: Sequelize.STRING,allowNull: false},
    price: {type: Sequelize.INTEGER,allowNull: false},
    available: {type: Sequelize.BOOLEAN,allowNull: false},

},{sequelize,modelName: "Products"})

class OrderDetails extends Model{}

OrderDetails.init({
    user_id: {type: Sequelize.INTEGER,allowNull: false},
    time: {type: Sequelize.STRING,allowNull: false},
    status_id: {type: Sequelize.INTEGER,allowNull: false},
    address_id: {type: Sequelize.INTEGER,allowNull: false},
    paymentMethod_id: {type: Sequelize.INTEGER,allowNull: false},
    total: {type: Sequelize.INTEGER,allowNull: false},

},{sequelize,modelName: "OrderDetails"})

class Order extends Model{}

Order.init({
    product_id: {type: Sequelize.INTEGER,allowNull: false},
    orderDetails_id: {type: Sequelize.INTEGER,allowNull: false},
    amount: {type: Sequelize.INTEGER,allowNull: false},
    price: {type: Sequelize.INTEGER,allowNull: false},

},{sequelize,modelName: "Order"})


class PaymentMethod extends Model{}

PaymentMethod.init({
    method: {type: Sequelize.STRING,allowNull: false},

},{sequelize,modelName: "PaymentMethod"})

class OrderStatus extends Model{}

OrderStatus.init({
    status: {type: Sequelize.STRING,allowNull: false},

},{sequelize,modelName: "OrderStatus"})


User.hasMany(OrderDetails, {foreignKey: "user_id"})

User.hasMany(Address, {foreignKey: "user_id"})

OrderStatus.hasMany(OrderDetails, {foreignKey: "status_id"})

Address.hasMany(OrderDetails, {foreignKey: "address_id"})

PaymentMethod.hasMany(OrderDetails, {foreignKey: "paymentMethod_id"})

OrderDetails.hasMany(Order, {foreignKey: "orderDetails_id"})

Products.hasMany(Order, {foreignKey: "product_id"})

;(async() => {
    await sequelize.sync({ force: true })
    console.log("All models were synchronized successfully.")
})()

module.exports = {User,Address,Products,OrderDetails,Order,PaymentMethod,OrderStatus}