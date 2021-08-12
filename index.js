const express = require("express")
const app = express()
const config = require("./config.js")

const users = require("./routes/user_routes")
const products = require("./routes/products_routes")

app.use("/users", users)
app.use("/products", products)


app.listen(config.port,() => {
    console.log(`Escuchando el puerto: ${config.port}`)
})