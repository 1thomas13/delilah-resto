const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database/sequelize");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    name: { type: Sequelize.STRING, allowNull: false },
    username: { type: Sequelize.STRING, allowNull: true },
    password: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    numberPhone: { type: Sequelize.INTEGER, allowNull: true },
    isAdmin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    isSuspended: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, timestamps: false, modelName: "User" }
);

class Address extends Model {}

Address.init(
  {
    destination: { type: Sequelize.STRING, allowNull: false },
  },
  { sequelize, timestamps: false, modelName: "Address" }
);

class Product extends Model {}

Product.init(
  {
    name: { type: Sequelize.STRING, allowNull: false },
    price: { type: Sequelize.INTEGER, allowNull: false },
    available: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: true,
    },
    image: { type: Sequelize.STRING, allowNull: false, defaultValue: true },
  },
  { sequelize, timestamps: false, modelName: "Products" }
);

class Order extends Model {}

Order.init(
  {
    time: { type: Sequelize.STRING, allowNull: false },
    total: { type: Sequelize.INTEGER, allowNull: false },
  },
  { sequelize, timestamps: false, modelName: "Order" }
);

class OrderDetail extends Model {}

OrderDetail.init(
  {
    amount: { type: Sequelize.INTEGER, allowNull: false },
  },
  { sequelize, timestamps: false, modelName: "OrderDetail" }
);

class PaymentMethod extends Model {}

PaymentMethod.init(
  {
    method: { type: Sequelize.STRING, allowNull: false },
  },
  { sequelize, timestamps: false, modelName: "PaymentMethod" }
);

class OrderStatus extends Model {}

OrderStatus.init(
  {
    status: { type: Sequelize.STRING, allowNull: false },
  },
  { sequelize, timestamps: false, modelName: "OrderStatus" }
);

User.hasMany(Order, { foreignKey: "userId" });

User.hasMany(Address, { foreignKey: "userId" });

OrderStatus.hasMany(Order, { foreignKey: "statusId" });

Address.hasMany(Order, { foreignKey: "addressId" });

PaymentMethod.hasMany(Order, { foreignKey: "paymentMethodId" });

Order.hasMany(OrderDetail, { foreignKey: "orderId" });

Product.hasMany(OrderDetail, { foreignKey: "productId" });
(async () => {
  await sequelize.sync();
  console.log("All models were synchronized successfully.");

  // await OrderStatus.create({
  //   status: "new",
  // });
  // await OrderStatus.create({
  //   status: "confirmed",
  // });
  // await OrderStatus.create({
  //   status: "preparing",
  // });
  // await OrderStatus.create({
  //   status: "sendig",
  // });
  // await OrderStatus.create({
  //   status: "delivered",
  // });
  // await OrderStatus.create({
  //   status: "cancelled",
  // });

  // await PaymentMethod.create({
  //   method: "efectivo",
  // });

  // await PaymentMethod.create({
  //   method: "debito",
  // });

  // await Product.create({
  //   name: "Pizza Mozzarella",
  //   price: 1000,
  //   available: true,
  //   image: "https://imgur.com/8e1W2T4.jpg",
  // });

  // await Product.create({
  //   name: "Hamburguesa Completa",
  //   price: 930,
  //   available: true,
  //   image: "https://imgur.com/a2bbWCB.jpg",
  // });
  // await Product.create({
  //   name: "Empanadas de carne",
  //   price: 900,
  //   available: true,
  //   image: "https://imgur.com/DiQyI6U.jpg",
  // });
  // await Product.create({
  //   name: "Lasaña",
  //   price: 1500,
  //   available: true,
  //   image: "https://imgur.com/oZqi0gJ.jpg",
  // });
  // await Product.create({
  //   name: "Parrilla completa",
  //   price: 1600,
  //   available: true,
  //   image: "https://imgur.com/whrvYUE.jpg",
  // });
  // await Product.create({
  //   name: "Napolitana con fritas",
  //   price: 1600,
  //   available: true,
  //   image: "https://imgur.com/zwzCJqb.jpg",
  // });

  // const hashPass = bcrypt.hashSync("1234", 8);

  // await User.create({
  //   name: "xxxx xxxxx",
  //   username: "Admin",
  //   password: hashPass,
  //   email: "admin@gmail.com",
  //   numberPhone: 2943242422,
  //   isAdmin: true,
  //   isSuspended: false,
  // });
})();

module.exports = {
  User,
  Address,
  Product,
  OrderDetail,
  Order,
  PaymentMethod,
  OrderStatus,
};
