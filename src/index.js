const express = require("express")
const app = express()
const {config} = require("./config")
const cors = require('cors')
app.use(cors());

const usersRoutes = require("./users/routes/routes")
const productsRoutes = require("./products/routes/routes")
const ordersRoutes = require("./orders/routes/routes")
const paymentRoutes = require("./paymentMethod/routes/routes")

app.use("/users", usersRoutes)
app.use("/products", productsRoutes)
app.use("/orders", ordersRoutes)
app.use("/payment", paymentRoutes)

app.listen(config.server.port,() => {
    console.log(`Escuchando el puerto: ${config.server.port}`)
})