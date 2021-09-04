const express = require("express")
const app = express()
const config = require("./config.js")
const cors = require('cors')
app.use(cors());

const users = require("./users/routes")
const products = require("./products/routes")
const orders = require("./orders/routes")
const payment = require("./paymentMethod/routes")

app.use("/users", users)
app.use("/products", products)
app.use("/orders", orders)
app.use("/payment", payment)

app.listen(config.port,() => {
    console.log(`Escuchando el puerto: ${config.port}`)
})