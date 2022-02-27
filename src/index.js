const express = require('express')
const app = express()
const { config } = require('./config')
const cors = require('cors')
const helmet = require('helmet')

const session = require("express-session");

const morgan = require("morgan")

app.use(morgan("dev"))
app.use(cors())
app.use(helmet())
app.use(session({
  secret: 'mi-secreto',
  resave: true,
  saveUninitialized: true
}));

const usersRoutes = require('./users/routes/routes')
const productsRoutes = require('./products/routes/routes')
const ordersRoutes = require('./orders/routes/routes')
const paymentRoutes = require('./paymentMethod/routes/routes')
const addressRoutes = require('./address/routes/routes')
const authRoutes = require('./auth/routes')

app.use('/users', usersRoutes)
app.use('/products', productsRoutes)
app.use("/orders", ordersRoutes)
app.use('/payment', paymentRoutes)
app.use('/address', addressRoutes)


app.use('/auth', authRoutes)

app.listen(config.server.port, () => {
  console.log(`Escuchando el puerto: ${config.server.port}`)
})

module.exports = app
