
const users = require("../data")

exports.allUsers = (req,res) =>{
    res.json({"users": users})
}
let id = 1

exports.register = (req,res) => {
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
    
}

exports.login = (req,res) => {

    findUser.isLogged = true
    res.status(200).json({message:`Sesion iniciada. Bienvenido ${findUser.username}`})
}