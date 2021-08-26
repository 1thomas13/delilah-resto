const express = require("express")
const router = express.Router()

const users = require("./data.js")
const middle = require("./middlewares")

router.use(express.json())

//mostrar usuarios
router.get("/:id",middle.isLogged,middle.isAdmin,(req,res) => {
    res.json({"users": users})
})

let id = 1
//registro
router.post("/",middle.emailValidate,(req,res) => {
   
    const {name,username,password,email,numberPhone,address} = req.body

    const newUser = {
        id:id++,
        name:name,
        username:username,
        password:password,
        email:email,
        numberPhone:numberPhone,
        address:address,
        isAdmin: false,
        isLogged: false
    }

    users.push(newUser)
    res.status(201).json({message:"Usuario creado correctamente"})
    
})

//login

router.post("/login",middle.validateLogin,(req,res) => {

    findUser.isLogged = true
    res.status(200).json({message:`Sesion iniciada. Bienvenido ${findUser.username}`})
    
})


module.exports = router