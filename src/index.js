const express = require('express')
const app = express()
const { config } = require('./config')
const cors = require('cors')
const helmet = require('helmet')

const morgan = require("morgan")

app.use(morgan("dev"))
app.use(cors())
app.use(helmet())
app.use(express.json());

const usersRoutes = require('./users/routes/routes')
const productsRoutes = require('./products/routes/routes')
const ordersRoutes = require('./orders/routes/routes')
const paymentRoutes = require('./paymentMethod/routes/routes')
const addressRoutes = require('./address/routes/routes')
const authRoutes = require('./auth/routes/routes')
const sdkRoutes = require('./sdk/routes/routes')

app.use('/users', usersRoutes)
app.use('/products', productsRoutes)
app.use("/orders", ordersRoutes)
app.use('/payment', paymentRoutes)
app.use('/address', addressRoutes)
app.use('/auth', authRoutes)
app.use('/sdk', sdkRoutes)


app.get('/', (req,res) =>{
  return res.status(200).json('Index ok')
})

app.listen(3000, () => {
  console.log(`Escuchando el puerto: ${config.server.port}`)
})

module.exports = app
