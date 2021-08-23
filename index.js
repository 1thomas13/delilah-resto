const express = require("express")
const app = express()
const config = require("./config.js")

const users = require("./users/routes")
const products = require("./products/routes")
const orders = require("./orders/routes")

app.use("/users", users)
app.use("/products", products)
app.use("/orders", orders)

app.listen(config.port,() => {
    console.log(`Escuchando el puerto: ${config.port}`)
})