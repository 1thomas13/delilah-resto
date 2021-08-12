const express = require("express")
const router = express.Router()

const users = require("../data/users.js")

router.use(express.json())

router.get("/",(req,res) => {
    res.json({"users": users})
})

router.post("/",(req,res) => {
    users.push(req.body)
    res.status(201).json("Usuario creado correctamente")
})

//login

router.post("/login",(req,res) => {
    res.json("Sesion iniciada")
})


module.exports = router