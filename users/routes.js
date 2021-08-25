const express = require("express")
const router = express.Router()

const users = require("./data.js")
const middle = require("./middlewares")

router.use(express.json())

router.get("/",(req,res) => {
    res.json({"users": users})
})

let id = 1
//registro
router.post("/",middle.emailValidate,(req,res) => {
   
    req.body.isAdmin = false
    req.body.id = id++
    users.push(req.body)
    res.status(201).json({message:"Usuario creado correctamente"})
    
})

//login

router.post("/login",middle.validateLogin,(req,res) => {

    findUser.isLogged = true
    res.status(200).json({message:`Sesion iniciada. Bienvenido ${findUser.nameuser}`})
    
})


module.exports = router