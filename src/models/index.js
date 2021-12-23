const {Sequelize ,DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/sequelize');

class User extends Model{}

User.init({
    name: {type: Sequelize.STRING,allowNull: false},
    username: {type: Sequelize.STRING,allowNull: false},
    password: {type: Sequelize.STRING,allowNull: false,},
    email: {type: Sequelize.STRING,allowNull: false},
    numberPhone: {type: Sequelize.INTEGER,allowNull: false},
    isAdmin: {type: Sequelize.BOOLEAN,allowNull: false},
    isLogged: {type: Sequelize.BOOLEAN,allowNull: false},
    isSuspended: {type: Sequelize.BOOLEAN,allowNull: false},

},{sequelize,timestamps: false,modelName: "User"})


class Address extends Model{}

Address.init({
    destination: {type: Sequelize.STRING,allowNull: false},

},{sequelize,timestamps: false,modelName: "Address"})

class Product extends Model{}

Product.init({
    name: {type: Sequelize.STRING,allowNull: false},
    price: {type: Sequelize.INTEGER,allowNull: false},
    available: {type: Sequelize.BOOLEAN,allowNull: false},

},{sequelize,timestamps: false,modelName: "Products"})

class Order extends Model{}

Order.init({
    time: {type: Sequelize.STRING,allowNull: false},
    total: {type: Sequelize.INTEGER,allowNull: false},

},{sequelize,modelName: "Order"})

class OrderDetail extends Model{}

OrderDetail.init({
    amount: {type: Sequelize.INTEGER,allowNull: false},
    price: {type: Sequelize.INTEGER,allowNull: false},

},{sequelize,modelName: "OrderDetail"})


class PaymentMethod extends Model{}

PaymentMethod.init({
    method: {type: Sequelize.STRING,allowNull: false},

},{sequelize,timestamps: false,modelName: "PaymentMethod"})

class OrderStatus extends Model{}

OrderStatus.init({
    status: {type: Sequelize.STRING,allowNull: false},

},{sequelize,timestamps: false,modelName: "OrderStatus"})


User.hasMany(Order, {foreignKey: "userId"})

User.hasMany(Address, {foreignKey: "userId"})

OrderStatus.hasMany(Order, {foreignKey: "statusId"})

Address.hasMany(Order, {foreignKey: "addressId"})

PaymentMethod.hasMany(Order, {foreignKey: "paymentMethodId"})

OrderDetail.hasMany(Order, {foreignKey: "orderId"})

Product.hasMany(OrderDetail, {foreignKey: "productId"})

;(async() => {
    await sequelize.sync({ force: true })
    console.log("All models were synchronized successfully.")

    await OrderStatus.create({
        status: "new"
    })

})()

module.exports = {User,Address,Product,OrderDetail,Order,PaymentMethod,OrderStatus}